import { ICoupon } from './coupon.types'
import { ICurrency } from './currency.types'
import { IDiscount } from './discount.types'

export interface ILineItemPayload {
  product_id: number
  quantity: number
}

export interface ILineItem {
  product_id: number
  quantity: number
  name: string
  coupon_amount: number
  coupons: ICoupon[]
  discount_amount: number
  discounts: IDiscount[]
  extended_list_price: number
  extended_sale_price: number
  id: string
  image_url: string
  is_require_shipping: boolean
  list_price: number
  sale_price: number
  sku: string
  taxable: boolean
  url: string
  variant_id: number
}

export interface IAddCartItemsPayload {
  line_items: ILineItemPayload[]
}
export interface IUpdateCartItemPayload {
  line_item: ILineItemPayload
}

export interface ICart {
  base_amount: number
  cart_amount: number
  channel_id: number
  coupons: ICoupon[]
  created_time: string
  currency: { code: string }
  customer_id: number
  discount_amount: number
  email: string
  id: string
  line_items: {
    physical_items: ILineItem[]
  }
  locale: string
  tax_included: boolean
  updated_time: string
}

export interface ICheckoutUrl {
  cart_url: string
  checkout_url: string
}
