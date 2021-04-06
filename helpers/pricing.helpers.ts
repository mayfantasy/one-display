import {
  IBulkPricing,
  IBulkPricingDiscountType,
} from 'types/product-pricing.types'
import { IBulkPricingRule } from 'types/product.types'

export const getPriceFromBulkPricing = (
  rules: IBulkPricing[],
  base: number,
  quantity: number
) => {
  const calculatePrice = (rule: IBulkPricing, base: number) => {
    let res = base
    switch (rule.discount_type) {
      case IBulkPricingDiscountType.fixed:
        res = rule.discount_amount
        break
      case IBulkPricingDiscountType.percent:
        res = base * ((100 - rule.discount_amount) / 100)
        break
      case IBulkPricingDiscountType.price:
        res = base - rule.discount_amount
        break
      default:
        res = base
    }
    return res
  }

  const findRule = rules.find(
    (b) => quantity >= b.minimum && (b.maximum ? quantity <= b.maximum : true)
  )
  if (findRule) {
    return calculatePrice(findRule, base)
  }
  return base
}
