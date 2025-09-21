import { IssueType } from "@/types/createIssue";
import axiosInstance, { Response } from "./axiosInstance";

export const createIssue = async (payload: IssueType) => {
  const res = await axiosInstance.post<Response<IssueType>>(
    "/api/issues",
    payload
  );
  return res.data.data;
};

export const editeIssue = async (payload: IssueType & { id?: string }) => {
  if (!payload.id) throw new Error("Missing issue ID for edit");
  const res = await axiosInstance.patch<Response<IssueType>>(
    `/api/issues/${payload.id}`,
    payload
  );
  return res.data.data;
};
export const deleteIssue = async (id: string) =>{
  if (!id) throw new Error("Missing issue ID for edit");
  const res = await axiosInstance.delete<Response<IssueType>>(
    `/api/issues/${id}` 
  );
  return res.data.data;
}