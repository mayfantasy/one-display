import jwt from 'jsonwebtoken'
import { IPasswordResetEncodeObject } from 'types/auth.types'

const key = 'generateResetPasswordToken'

export const generateResetPasswordToken = (
  payload: IPasswordResetEncodeObject
) => {
  return jwt.sign(payload, key)
}

export const decodeResettPasswordToken = (
  token: string
): IPasswordResetEncodeObject => {
  return jwt.verify(token, key) as IPasswordResetEncodeObject
}
