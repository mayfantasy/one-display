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

const getLoginUrl = (
  customerId: number,
  storeHash: string,
  storeUrl: string,
  clientId: string,
  clientSecret: string,
  checkoutUrl: string
) => {
  const { v4: uuidv4 } = require('uuid')
  const dateCreated = Math.round(new Date().getTime() / 1000)
  const payload = {
    iss: clientId,
    iat: dateCreated,
    jti: uuidv4(),
    operation: 'customer_login',
    store_hash: storeHash,
    customer_id: customerId,
    redirect_to: checkoutUrl,
  }
  let token = jwt.sign(payload, clientSecret, { algorithm: 'HS256' })
  return `${storeUrl}/login/token/${token}`
}

export const generateLoginUrl = (customerId: number, checkoutUrl: string) => {
  const clientId = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID!
  const clientSecret = process.env.BIGCOMMERCE_STORE_API_CLIENT_SECRET!
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH!
  const storeUrl = 'https://jw-beaver-inc.mybigcommerce.com'

  console.log('======')
  console.log(customerId)
  console.log(storeHash)
  console.log(storeUrl)
  console.log(clientId)
  console.log(clientSecret)
  console.log(checkoutUrl)
  console.log('======')
  // console.log(
  //   '======',
  //   customerId,
  //   storeHash,
  //   storeUrl,
  //   clientId,
  //   clientSecret,
  //   checkoutUrl,
  //   '======'
  // )

  const loginUrl = getLoginUrl(
    customerId,
    storeHash,
    storeUrl,
    clientId,
    clientSecret,
    checkoutUrl
  )
  return loginUrl
}
