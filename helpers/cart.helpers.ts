import { ICart } from 'types/cart.types'

export const getCartItemsCount = (cart: ICart) => {
  return cart.line_items.physical_items.reduce((a, c) => a + c.quantity, 0)
}
