export interface IPricing {
  as_entered: number
  entered_inclusive: boolean
  tax_exclusive: number
  tax_inclusive: number
}

export interface IBulkPricing {
  minimum: number
  maximum: number
  discount_amount: number
  discount_type: 'PERCENT'
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
  options: [
    {
      option_id: number
      value_id: number
    }
  ]
  retail_price: IPricing
  sale_price: IPricing
  minimum_advertised_price: IPricing
  price: IPricing
  calculated_price: IPricing
  price_range: {
    minimum: IPricing
    maximum: IPricing
  }
  retail_price_range: {
    minimum: IPricing
    maximum: IPricing
  }
  bulk_pricing: IBulkPricing[]
}
