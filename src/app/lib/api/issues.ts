import { createIssueType } from "@/types/createIssue";
import axiosInstance, { Response } from "./axiosInstance";

export const createIssue = async (payload: createIssueType) => {
  const res = await axiosInstance.post<Response<createIssueType>>(
    `/api/issues`,
    payload
  );
  return res.data.data;
};
