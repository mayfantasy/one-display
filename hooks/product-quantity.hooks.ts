import { ChangeEvent, useState } from 'react'

export const useProductQuantity = () => {
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
    }
  }
  return { quantity, setQuantity, handleQuantity, increaseQuantity }
}
