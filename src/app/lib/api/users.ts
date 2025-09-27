import { User } from "next-auth";
import axiosInstance, { Response } from "./axiosInstance";

export const fetchUsers = async () => {
  const res = await axiosInstance.get<Response<User[]>>("/api/users");

  if (!res.data) {
    throw new Error("No user data returned");
  }

  return res.data;
};
