import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_BASE_URL } from "@/shared/api/constants"

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
})

client.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<T> => response,
  (error: unknown): Promise<never> => Promise.reject(error),
)

async function parseResponse<T>(response: Promise<AxiosResponse<T>>): Promise<T> {
  const result = await response
  return result.data
}

export const fetcher = {
  get: <T>(endpoint: string, options?: AxiosRequestConfig) => parseResponse<T>(client.get<T>(endpoint, options)),
  post: <T, D = unknown>(endpoint: string, data?: D, options?: AxiosRequestConfig) =>
    parseResponse<T>(client.post<T, AxiosResponse<T>, D>(endpoint, data, options)),
  put: <T, D = unknown>(endpoint: string, data?: D, options?: AxiosRequestConfig) =>
    parseResponse<T>(client.put<T, AxiosResponse<T>, D>(endpoint, data, options)),
  delete: <T>(endpoint: string, options?: AxiosRequestConfig) => parseResponse<T>(client.delete<T>(endpoint, options)),
  patch: <T, D = unknown>(endpoint: string, data?: D, options?: AxiosRequestConfig) =>
    parseResponse<T>(client.patch<T, AxiosResponse<T>, D>(endpoint, data, options)),
}
