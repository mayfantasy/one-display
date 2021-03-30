import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Trash, Plus, Minus } from '@components/icons'
import usePrice from '@framework/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import Button from 'components/common/Button'
import QuantityInput from '@components/form/QuantityInput'
import { ICart, ILineItem } from 'types/cart.types'
import {
  updateCartItemRequest,
  removeCartItemRequest,
} from 'requests/cart.request'
import { CURRENCY_PREFIX } from 'helpers/constant.helpers'

interface IProps {
  cart: ICart
  item: ILineItem
  setCart: (cart: ICart) => void
  getCart: () => void
}

const CartItem = (props: IProps) => {
  const { cart, item, setCart, getCart } = props

  // Handle local quantity change
  const [quantity, setQuantity] = useState(item.quantity)
  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }

  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }

  // Update
  const updateQuantity = async (val: number) => {
    updateCartItemRequest(cart.id, item.id, {
      line_item: { quantity: val, product_id: item.product_id },
    }).then((res) => {
      setCart(res.data.result.cart)
    })
  }

  // Add
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val)) {
      if (val > 0) {
        setQuantity(val)
        updateQuantity(val)
      }
      if (val === 0) {
        setQuantity(val)
        handleRemove()
      }
    }
  }

  // Remove
  const [removing, setRemoving] = useState(false)
  const handleRemove = async () => {
    setRemoving(true)

    try {
      removeCartItemRequest(cart.id, item.id).then((res) => {
        getCart()
      })
    } catch (error) {
      setRemoving(false)
    }
  }

  // Render
  return (
    <li
      className={cn('flex flex-row space-x-8 py-8', {
        'opacity-75 pointer-events-none': removing,
      })}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden">
        <Image
          src={item.image_url}
          width={150}
          height={150}
          alt="Product Image"
          // The cart item image is already optimized and very small in size
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col text-base">
        {/** TODO: Replace this. No `path` found at Cart */}
        <Link href={`/product/${item.url.split('/')[3]}`}>
          <span className="font-bold mb-5 text-lg cursor-pointer">
            {item.name}
          </span>
        </Link>

        <div className="flex items-center">
          <QuantityInput
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            handleQuantity={handleQuantity}
            handleBlur={handleBlur}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>
          {CURRENCY_PREFIX} {item.extended_list_price.toFixed(2)}
        </span>
        <button
          className="flex justify-end outline-none"
          onClick={handleRemove}
        >
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem
