import { IAddress } from './address.types'
import { IPagination } from './utils.types'

export interface IClientAccountForm {
  // Basic
  companyName: string
  contactEmail: string
  contactFirstName: string
  contactLastName: string
  mobile: string
  dba: string
  // Company address
  address1: string
  address2: string
  city: string
  province: string
  postal: string
  country: string
  telephone: string
  fax: string
  // Tax info
  taxContactFirstName: string
  taxContactLastName: string
  taxTelephone: string
  taxMobile: string
  taxable: boolean
  noneTaxableReason: string
  pst: string
  hst: string
  // Other
  referredFrom: string
  subscribe: boolean
  // Password
  password: string
  confirmPassword?: string
}

export interface IUpsertCustomerAttributeValuesPayloadItem {
  attribute_id: number
  customer_id: number
  value: string
}

export interface ICreateCustomerPayload {
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  addresses: IAddressPayload[]
}

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
  attributes: ICustomerAttributeData[]
  store_credit_amounts: Array<{ amount: number }>
  accepts_product_review_abandoned_cart_emails: boolean
  channel_ids: number[]
}

export interface ICustomer {
  data: ICustomerData[]
  pagination: IPagination
}

export interface IAddressPayload {
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
}

export interface ICustomerAttribute {
  data: ICustomerAttributeData[]
  pagination: IPagination
}

export interface ICustomerAttributeData {
  id: number
  customer_id: number
  attribute_id: number
  attribute_value: string
  date_created: string
  date_modified: string
}

export interface ICustomerAttributePayload {
  attribute_id: number
  attribute_value: string
}
