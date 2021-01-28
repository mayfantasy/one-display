import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const baseURL = `/`

console.log(baseURL)

const api = Axios.create({
  baseURL,
})

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const _config = {
      ...config,
      // headers,
    }
    return _config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  (res: any) => {
    return res
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export { api }
