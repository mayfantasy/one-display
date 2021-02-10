import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useUI } from '@components/ui/context'
import { addCartItemRequest, getCartRequest } from 'requests/cart.request'
import { getCartItemsCount } from 'helpers/cart.helpers'
import {
  _30_DAYS_COOKIE_DURATION,
  _3_YEARS_COOKIE_DURATION,
} from 'helpers/constant.helpers'
import { ICart } from 'types/cart.types'
import { useCartId } from './cart-id.hooks'

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

export const useAddToCart = (product_id?: number, quantity?: number) => {
  const [loading, setLoading] = useState(false)
  const { openSidebar, setCartItemsCount } = useUI()
  const cartId = useCartId()
  const addToCart = async () => {
    if (cartId && product_id) {
      setLoading(true)
      try {
        const newCart = await addCartItemRequest(cartId, {
          line_items: [
            {
              product_id,
              quantity: quantity || 1,
            },
          ],
        })
        setCartItemsCount(getCartItemsCount(newCart.data.result.cart))
        openSidebar()
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
  }
  return { addToCart, loading }
}
