import { AxiosResponse } from 'axios'
import { api } from './client'

export const subscribeRequest = (
  email: string
): Promise<AxiosResponse<{ result: { email: boolean } }>> => {
  return api.post(`/api/subscribe`, { email })
}
