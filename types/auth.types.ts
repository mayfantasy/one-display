export interface IForgotPasswordPayload {
  email: string
}

export interface IResetPasswordPayload {
  password: string
  confirmPassword: string
}

export interface IPasswordResetEncodeObject {
  customer_id: number
  email: string
}
