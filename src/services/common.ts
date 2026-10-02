import axios, { AxiosError } from "axios";
import { EMVITE_API_URL } from "../config";
import type { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: EMVITE_API_URL,
});

api.interceptors.response.use(
  (
    response: AxiosResponse<{
      success: boolean;
      data: never;
      message?: string;
    }> & {
      message?: string;
    },
  ) => {
    response.message = response.data.message;
    response.data = response.data.data;
    return response;
  },
  async (error: AxiosError) => {
    console.error(error);
    console.log(error.config);

    const status = error.response?.status || error.status || 500;
    const errorData = error.response?.data as
      | {
          error?: {
            code: number;
            message: string;
          };
        }
      | undefined;
    return Promise.reject({
      status,
      message: errorData?.error?.message || error.message,
    });
  },
);

export { api };

export type ApiError = {
  status: number;
  message: string;
};

export interface ApiResponse<T = never> {
  status: number;
  data: T;
  message?: string;
}
