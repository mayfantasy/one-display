import { useCookies } from 'react-cookie'

export const useCustomerId = () => {
  const [cookie] = useCookies(['customer_id'])
  const customerId = cookie.customer_id
  return customerId
}
