import { AxiosResponse } from 'axios'
import { api } from './client'

export const customerRegistrationNotificationRequest = (payload: {
  email: string
  first_name: string
  last_name: string
}): Promise<AxiosResponse<{ result: { sent: boolean } }>> => {
  return api.post(`/api/customer-registration-notification`, payload)
}
