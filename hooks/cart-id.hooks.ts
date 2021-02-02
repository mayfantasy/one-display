import { useCookies } from 'react-cookie'

export const useCartId = () => {
  const [cookie] = useCookies(['cart_id'])
  const cartId = cookie.cart_id
  return cartId
}
