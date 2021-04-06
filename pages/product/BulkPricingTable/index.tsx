import { CURRENCY_PREFIX } from 'helpers/constant.helpers'
import {
  IBulkPricingDiscountType,
  IBulkPricing,
} from 'types/product-pricing.types'
import { IBulkPricingRule } from 'types/product.types'

interface IProps {
  rules?: IBulkPricing[]
}

const BulkPricingTable = (props: IProps) => {
  const { rules } = props

  // Get discount
  const getDiscount = (rule: IBulkPricing) => {
    if (rule.discount_type === IBulkPricingDiscountType.fixed) {
      return (
        <span>
          {CURRENCY_PREFIX}
          {rule.discount_amount}
        </span>
      )
    }
    if (rule.discount_type === IBulkPricingDiscountType.percent) {
      return <span>{rule.discount_amount}% OFF</span>
    }
    if (rule.discount_type === IBulkPricingDiscountType.price) {
      return (
        <span>
          {CURRENCY_PREFIX}
          {rule.discount_amount} OFF
        </span>
      )
    }
  }

  // Get range
  const getRange = (rule: IBulkPricing) => {
    if (rule.minimum) {
      if (rule.maximum) {
        return (
          <span>
            {rule.minimum} to {rule.maximum}
          </span>
        )
      }
      return <span>{rule.minimum} Up</span>
    }
  }

  // Render
  return (
    <table className="text-gray-700" style={{ width: 250 }}>
      <tr>
        <th className="border px-2 py-1">Quantity</th>
        <th className="border px-2 py-1">Price</th>
      </tr>
      {(rules || []).map((r) => (
        <tr key={`${r.discount_type}${r.minimum}${r.maximum}`}>
          <td className="border px-2 py-1">{getRange(r)}</td>
          <td className="border px-2 py-1">{getDiscount(r)}</td>
        </tr>
      ))}
    </table>
  )
}

export default BulkPricingTable
