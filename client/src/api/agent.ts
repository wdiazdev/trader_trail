import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import { UserAccount, ApiResponse } from "../types"

interface ErrorResponse {
  message?: string
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // Includes credentials in cross-origin requests by default.
  // This is useful for making authenticated API requests to a
  // server that is different from the one serving your web application.
  withCredentials: true,
})

const responseBody = (response: AxiosResponse) => response.data

apiClient.interceptors.request.use(
  async (config) => {
    const access_token = await AsyncStorage.getItem("access_token")
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (__DEV__) await sleep()
    return response
  },

  (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const response = error.response as AxiosResponse<ErrorResponse>
      if (response) {
        const { status, data } = response
        let errorMessage = "An unexpected error occurred"

        switch (status) {
          case 400:
            errorMessage = data?.message || "Bad Request"
            break
          case 401:
            errorMessage = data?.message || "Unauthorized"
            break
          case 404:
            errorMessage = data?.message || "Resource Not Found"
            break
          case 500:
            errorMessage = data?.message || "Internal Server Error"
            break
          default:
            errorMessage = data?.message || errorMessage
            break
        }
      }
    }
    return Promise.reject(error)
  },
)

const requests = {
  get: (url: string, params?: URLSearchParams) => apiClient.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => apiClient.post(url, body).then(responseBody),
  put: (url: string, body: object) => apiClient.put(url, body).then(responseBody),
  delete: (url: string) => apiClient.delete(url).then(responseBody),
  patch: (url: string, body: object) => apiClient.patch(url, body).then(responseBody),
}

const Auth = {
  login: (values: { email: string; password: string }) => requests.post("/auth/login", values),
  register: (values: { email: string; password: string }) => requests.post("/auth/signup", values),
  delete: (userId: string) => requests.delete(`/auth/delete/${userId}`),
  getUser: () => requests.get("/auth/getUser"),
}

const Account = {
  createAccount: (body: { userId: string; nickname?: string }) =>
    requests.post("/account/create", body),
  getAccounts: (userId: string): Promise<ApiResponse<UserAccount[]>> =>
    requests.get(`/account/user/${userId}`),
  updateAccount: (accountId: string, body: { nickname: string }) =>
    requests.patch(`/account/update/${accountId}`, body),
  deleteAccount: (accountId: string) => requests.delete(`/account/delete/${accountId}`),
}

const agent = {
  Auth,
  Account,
}

export default agent
