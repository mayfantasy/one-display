import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { UserNav } from '@components/common'

import { Bag, Cross, Check } from '@components/icons'
import { useUI } from '@components/ui/context'
import { useCart } from 'hooks/cart.hooks'
import usePrice from '@framework/use-price'
import CartItem from '../CartItem'
import { ICart } from 'types/cart.types'

import {
  CURRENCY_PREFIX,
  _30_DAYS_COOKIE_DURATION,
} from 'helpers/constant.helpers'
import { getCartItemsCount } from 'helpers/cart.helpers'
import { useCheckoutUrl } from 'hooks/checkout.hooks'
import Button from '@components/common/Button'

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI()
  const { cart, loading, setCart, getCart } = useCart()
  const { url } = useCheckoutUrl(cart?.id)

  const isEmpty = !cart?.line_items.physical_items.length
  const items = cart?.line_items.physical_items ?? []

  const error = null
  const success = null

  return (
    <div>
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={closeSidebar}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Not cart data show cart loading state */}
      {!cart && loading && <div className="px-4">Loading cart...</div>}

      {/* has cart */}
      {cart &&
        (isEmpty ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-accents-3 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn’t process the purchase. Please check your card
              information and try again.
            </h2>
          </div>
        ) : success ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Thank you for your order.
            </h2>
          </div>
        ) : (
          <>
            <div className="px-4 sm:px-6 flex-1">
              <h2 className="pt-1 pb-4 leading-7 font-bold text-base tracking-wide">
                My Cart
              </h2>
              <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
                {items.map((item: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    cart={cart}
                    setCart={setCart}
                    getCart={getCart}
                  />
                ))}
              </ul>
            </div>

            <div className="flex-shrink-0 px-4  py-5 sm:px-6">
              <div className="border-t border-accents-3">
                <ul className="py-3">
                  <li className="flex justify-between py-1">
                    <span>Subtotal</span>
                    <span>
                      {CURRENCY_PREFIX} {cart?.base_amount.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex justify-between py-1 text-sm pb-0">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </li>
                  <li className="flex justify-between py-1 text-sm pt-0">
                    <span>Estimated Shipping</span>
                    <span>Calculated at checkout</span>
                  </li>
                </ul>
                <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
                  <span>Total</span>
                  <span>
                    {CURRENCY_PREFIX} {cart?.base_amount.toFixed(2)}
                  </span>
                </div>
              </div>
              {url && (
                <Button
                  primary
                  className="text-center"
                  onClick={() => {
                    window.location.href = url
                  }}
                >
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </>
        ))}
    </div>
  )
}

export default CartSidebarView
