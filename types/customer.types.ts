import { IPagination } from './utils.types'

export interface ICustomerData {
  id: number
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  registration_ip_address: string
  notes: string
  tax_exempt_category: string
  customer_group_id: number
  date_modified: string
  date_created: string
  authentication: { force_password_reset: boolean }
  addresses: IAddress[]
  store_credit_amounts: Array<{ amount: number }>
  accepts_product_review_abandoned_cart_emails: boolean
  channel_ids: number[]
}

export interface ICustomer {
  data: ICustomerData[]
  pagination: IPagination
}

export interface IAddress {
  id: number
  first_name: string
  last_name: string
  company: string
  address1: string
  address2: string
  city: string
  state_or_province: string
  postal_code: string
  country_code: string
  phone: string
  address_type: string
  customer_id: number
  country: string
}
