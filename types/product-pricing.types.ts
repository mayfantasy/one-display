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
  retail_price: {
    as_entered: number
    entered_inclusive: boolean
    tax_exclusive: number
    tax_inclusive: number
  }
  sale_price: {
    as_entered: number
    entered_inclusive: boolean
    tax_exclusive: number
    tax_inclusive: number
  }
  minimum_advertised_price: {
    as_entered: number
    entered_inclusive: boolean
    tax_exclusive: number
    tax_inclusive: number
  }
  price: {
    as_entered: number
    entered_inclusive: boolean
    tax_exclusive: number
    tax_inclusive: number
  }
  calculated_price: {
    as_entered: number
    entered_inclusive: boolean
    tax_exclusive: number
    tax_inclusive: number
  }
  price_range: {
    minimum: {
      as_entered: number
      entered_inclusive: boolean
      tax_exclusive: number
      tax_inclusive: number
    }
    maximum: {
      as_entered: number
      entered_inclusive: boolean
      tax_exclusive: number
      tax_inclusive: number
    }
  }
  retail_price_range: {
    minimum: {
      as_entered: number
      entered_inclusive: boolean
      tax_exclusive: number
      tax_inclusive: number
    }
    maximum: {
      as_entered: number
      entered_inclusive: boolean
      tax_exclusive: number
      tax_inclusive: number
    }
  }
  bulk_pricing: [
    {
      minimum: number
      maximum: number
      discount_amount: number
      discount_type: 'PERCENT'
    }
  ]
}
