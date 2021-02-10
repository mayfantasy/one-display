import {
  IBulkPricing,
  IBulkPricingDiscountType,
} from 'types/product-pricing.types'
import { IBulkPricingRule } from 'types/product.types'

export const getPriceFromBulkPricing = (
  rules: IBulkPricingRule[],
  base: number,
  quantity: number
) => {
  const calculatePrice = (rule: IBulkPricingRule, base: number) => {
    let res = base
    switch (rule.type) {
      case IBulkPricingDiscountType.fixed:
        res = rule.amount
        break
      case IBulkPricingDiscountType.percent:
        res = base * ((100 - rule.amount) / 100)
        break
      case IBulkPricingDiscountType.price:
        res = base - rule.amount
        break
      default:
        res = base
    }
    return res
  }

  const findRule = rules.find(
    (b) =>
      quantity >= b.quantity_min &&
      (b.quantity_max ? quantity <= b.quantity_max : true)
  )
  if (findRule) {
    return calculatePrice(findRule, base)
  }
  return base
}
