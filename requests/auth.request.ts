import { AxiosResponse } from 'axios'
import { IResetPasswordPayload } from 'types/auth.types'
import {
  IClientAccountForm,
  ICustomer,
  ICustomerData,
} from 'types/customer.types'
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

// Sign Up
export const signUpRequest = (
  payload: IClientAccountForm
): Promise<AxiosResponse<{ result: { customer: ICustomerData } }>> => {
  return api.post(`/api/customer/create`, payload)
}

// Account
export const getCustomerRequest = (
  id: number
): Promise<AxiosResponse<{ result: { customer: IClientAccountForm } }>> => {
  return api.get(`/api/customer/${id}`)
}
