import { ChangeEvent, useState } from 'react'
import { IProduct, IProductData } from 'types/product.types'

export const useProductQuantity = (product?: IProductData) => {
  const inventoryLevel = product?.inventory_level || 1
  /**
   * ||===========
   * || Quantity
   */
  const [quantity, setQuantity] = useState(1)
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (Number.isInteger(val) && val > 0) {
      setQuantity(val)
    }
    if (val > inventoryLevel) {
      setQuantity(inventoryLevel)
    }
  }

  // increase quantity
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n
    if (Number.isInteger(val)) {
      if (val > 0) {
        setQuantity(val)
      }
      if (val <= 0) {
        setQuantity(1)
      }
      if (val > inventoryLevel) {
        setQuantity(inventoryLevel)
      }
    }
  }
  return { quantity, setQuantity, handleQuantity, increaseQuantity }
}
