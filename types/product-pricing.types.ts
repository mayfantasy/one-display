export interface IPricing {
  as_entered: number
  entered_inclusive?: boolean
  tax_exclusive?: number
  tax_inclusive?: number
}

export enum IBulkPricingDiscountType {
  price = 'price',
  percent = 'percent',
  fixed = 'fixed',
}
export interface IBulkPricing {
  minimum: number
  maximum: number
  discount_amount: number
  discount_type: IBulkPricingDiscountType
}
export interface IProductPricingPayload {
  channel_id?: number
  currency_code?: string
  customer_group_id: number
  items: Array<{
    product_id: number
  }>
}

export interface IProductPriceMap {
  [product_id: string]: IProductPrice
}
export interface IProductPrice {
  product_id: number
  variant_id: number
  price: IPricing
  calculated_price: IPricing
  bulk_pricing?: IBulkPricing[]
}
