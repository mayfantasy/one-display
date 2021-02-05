import { IAddress } from './address.types'
import { IImage } from './category.types'
import { IDiscount } from './discount.types'
import { IProductImageData } from './image.types'

export enum IPaymentMethod {
  Manual = 'Manual',
  'Cash on Delivery' = 'Cash on Delivery',
  'Credit Card' = 'Credit Card',
  'Test Payment Gateway' = 'Test Payment Gateway',
  'Pay In Store' = 'Pay In Store',
}

export enum IOrderSortValue {
  id = 'id',
  customer_id = 'customer_id',
  date_created = 'date_created',
  date_modified = 'date_modified',
  status_id = 'status_id',
  channel_id = 'channel_id',
  external_id = 'external_id',
}

export enum IOrderStatus {
  'Awaiting Fulfillment' = 'Awaiting Fulfillment',
  'Incomplete' = 'Incomplete',
}

export enum IPaymentStatus {
  authorized = 'authorized',
  captured = 'captured',
  'capture pending' = 'capture pending',
  declined = 'declined',
  'held for review' = 'held for review',
  'paid' = 'paid',
  'partially refunded' = 'partially refunded',
  pending = 'pending',
  refunded = 'refunded',
  void = 'void',
  'void pending' = 'void pending',
}
export interface IOrder {
  id: number
  customer_id: number
  date_created: string
  date_modified: string
  date_shipped: string
  status_id: number
  status: string
  subtotal_ex_tax: string
  subtotal_inc_tax: string
  subtotal_tax: string
  base_shipping_cost: string
  shipping_cost_ex_tax: string
  shipping_cost_inc_tax: string
  shipping_cost_tax: string
  shipping_cost_tax_class_id: number
  base_handling_cost: string
  handling_cost_ex_tax: string
  handling_cost_inc_tax: string
  handling_cost_tax: string
  handling_cost_tax_class_id: number
  base_wrapping_cost: string
  wrapping_cost_ex_tax: string
  wrapping_cost_inc_tax: string
  wrapping_cost_tax: string
  wrapping_cost_tax_class_id: number
  total_ex_tax: string
  total_inc_tax: string
  total_tax: string
  items_total: number
  items_shipped: number
  payment_method: IPaymentMethod
  payment_provider_id: string
  payment_status: IPaymentStatus
  refunded_amount: string
  order_is_digital: boolean
  store_credit_amount: string
  gift_certificate_amount: string
  ip_address: string
  geoip_country: string
  geoip_country_iso2: string
  currency_id: number
  currency_code: string
  currency_exchange_rate: string
  default_currency_id: number
  default_currency_code: string
  staff_notes: string
  customer_message: string
  discount_amount: string
  coupon_discount: string
  shipping_address_count: number
  is_deleted: boolean
  ebay_order_id: string
  cart_id: string
  billing_address: IAddress
  is_email_opt_in: boolean
  credit_card_type: any
  order_source: string
  channel_id: number
  products: {
    url: string
    resource: string
  }
  shipping_addresses: {
    url: string
    resource: string
  }
  coupons: {
    url: string
    resource: string
  }
  tax_provider_id: string
  store_default_currency_code: string
  store_default_to_transactional_exchange_rate: string
  custom_status: string
}

export interface IOrderProductWithImages {
  product: IOrderProduct
  images: IProductImageData[]
}

export interface IOrderProduct {
  id: number
  order_id: number
  product_id: number
  variant_id: number
  order_address_id: number
  name: string
  name_customer: string
  name_merchant: string
  sku: string
  upc: string
  type: 'physical' | 'digital'
  base_price: string
  price_ex_tax: string
  price_inc_tax: string
  price_tax: string
  base_total: string
  total_ex_tax: string
  total_inc_tax: string
  total_tax: string
  weight: string
  width: string
  height: string
  depth: string
  quantity: number
  base_cost_price: string
  cost_price_inc_tax: string
  cost_price_ex_tax: string
  cost_price_tax: string
  is_refunded: boolean
  quantity_refunded: number
  refund_amount: string
  return_id: number
  wrapping_name: string
  base_wrapping_cost: string
  wrapping_cost_ex_tax: string
  wrapping_cost_inc_tax: string
  wrapping_cost_tax: string
  wrapping_message: string
  quantity_shipped: number
  event_name: string | null
  event_date: string
  fixed_shipping_cost: string
  ebay_item_id: string
  ebay_transaction_id: string
  option_set_id: string | null
  parent_order_product_id: null
  is_bundled_product: boolean
  bin_picking_number: string
  external_id: string | null
  fulfillment_source: string
  applied_discounts: IDiscount[]
}

export interface IOrderShippingAddress {
  id: number
  order_id: number
  first_name: string
  last_name: string
  company: string
  street_1: string
  street_2: string
  city: string
  zip: string
  country: string
  state: string
  email: string
  phone: string
}
