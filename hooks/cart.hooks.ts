import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useUI } from '@components/ui/context'
import { getCartRequest } from 'requests/cart.request'
import { getCartItemsCount } from 'helpers/cart.helpers'
import {
  _30_DAYS_COOKIE_DURATION,
  _3_YEARS_COOKIE_DURATION,
} from 'helpers/constant.helpers'
import { ICart } from 'types/cart.types'

export const useCart = () => {
  const [cart, setCart] = useState<ICart>()
  const [loading, setLoading] = useState(false)
  const { setCartItemsCount } = useUI()

  // Get cart and set cookie
  const [cookie, setCookie] = useCookies(['cart_id'])

  const getCart = () => {
    setLoading(true)
    getCartRequest()
      .then((res) => {
        const c = res.data.result.cart
        setCart(c)
        setCartItemsCount(getCartItemsCount(c))
        setCookie('cart_id', c.id, {
          path: '/',
          maxAge: _30_DAYS_COOKIE_DURATION, // Expires after 3 years
          sameSite: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getCart()
  }, [])

  return { cart, loading, setCart, getCart }
}
