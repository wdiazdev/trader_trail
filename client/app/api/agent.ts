import axios, { AxiosError, AxiosResponse } from "axios"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL

// Includes credentials in cross-origin requests by default.
// This is useful for making authenticated API requests to a
// server that is different from the one serving your web application.
axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(
  async function (response) {
    if (__DEV__) await sleep()
    return response
  },
  function (error: AxiosError) {
    if (error) {
      const { data, status } = error.response as AxiosResponse
      switch (status) {
        case 400:
          if (data && data.errors) {
            const modelStateErrors: string[] = []
            for (const key in data.errors) {
              modelStateErrors.push(data.errors[key])
            }
            throw modelStateErrors.flat()
          }
          //   toast.error(data.title)
          break
        case 401:
          //   toast.error(data.title)
          break
        case 500:
          // router.navigate("/server-error", { state: { error: data } })
          break
        case 404:
          // router.navigate("/not-found")
          break
        default:
          //   toast.error("An unexpected error occurred")
          break
      }
      return Promise.reject(error.response)
    }
  },
)

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Account = {
  login: (values: any) => requests.post("/auth/login", values),
  register: (values: any) => requests.post("/auth/signup", values),
}

const agent = {
  Account,
}

export default agent
