// src/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Optional: response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (typeof window !== "undefined" && error.response?.status === 401) {
//       localStorage.removeItem("servicesToken");
//       sessionStorage.removeItem("persist:root");
//       localStorage.removeItem("poopakToken");
//       location.reload();
//     }
//     return Promise.reject(error);
//   }
// );

export interface Response<T> {
  isSuccess: true;
  message: null;
  errors: null;
  log: null;
  data: T;
}

export default axiosInstance;
