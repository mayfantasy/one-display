import { useCookie } from './cookie.hooks'

export const useCustomerId = () => {
  return useCookie<number>('customer_id')
}
