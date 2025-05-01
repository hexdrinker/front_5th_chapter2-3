import ky, { Options, ResponsePromise } from "ky"
import { API_BASE_URL } from "@/shared/api/constants"

export const client = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        return response
      },
    ],
  },
})

export async function parseResponse<T>(response: ResponsePromise) {
  return await response.json<T>()
}

export const fetcher = {
  get: <T>(endpoint: string, options?: Options) => parseResponse<T>(client.get(endpoint, options)),
  post: <T>(endpoint: string, options?: Options) => parseResponse<T>(client.post(endpoint, options)),
  put: <T>(endpoint: string, options?: Options) => parseResponse<T>(client.put(endpoint, options)),
  delete: <T>(endpoint: string, options?: Options) => parseResponse<T>(client.delete(endpoint, options)),
}
