import { AxiosResponse } from 'axios'
import { IResetPasswordPayload } from 'types/auth.types'
import { api } from './client'

// Forgot password
export const forgotPasswordRequest = (
  email: string
): Promise<AxiosResponse<{ result: { url: string } }>> => {
  return api.post(`/api/auth/forgot-password`, { email })
}

// Reset password
export const resetPasswordRequest = (
  payload: IResetPasswordPayload,
  signature: string
): Promise<AxiosResponse<{ result: { reset: boolean } }>> => {
  return api.post(`/api/auth/reset-password?signature=${signature}`, payload)
}
