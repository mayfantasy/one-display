import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const baseURL = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3`
export const headers = {
  'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN!,
}

const api = Axios.create({
  baseURL,
})

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const _config = {
      ...config,
      headers,
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
