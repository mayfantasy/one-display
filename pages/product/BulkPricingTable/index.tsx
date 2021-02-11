import { CURRENCY_PREFIX } from 'helpers/constant.helpers'
import { IBulkPricingDiscountType } from 'types/product-pricing.types'
import { IBulkPricingRule } from 'types/product.types'

interface IProps {
  rules?: IBulkPricingRule[]
}

const BulkPricingTable = (props: IProps) => {
  const { rules } = props

  // Get discount
  const getDiscount = (rule: IBulkPricingRule) => {
    if (rule.type === IBulkPricingDiscountType.fixed) {
      return (
        <span>
          {CURRENCY_PREFIX}
          {rule.amount}
        </span>
      )
    }
    if (rule.type === IBulkPricingDiscountType.percent) {
      return <span>{rule.amount}% OFF</span>
    }
    if (rule.type === IBulkPricingDiscountType.price) {
      return (
        <span>
          {CURRENCY_PREFIX}
          {rule.amount} OFF
        </span>
      )
    }
  }

  // Get range
  const getRange = (rule: IBulkPricingRule) => {
    if (rule.quantity_min) {
      if (rule.quantity_max) {
        return (
          <span>
            {rule.quantity_min} to {rule.quantity_max}
          </span>
        )
      }
      return <span>{rule.quantity_min} Up</span>
    }
  }

  // Render
  return (
    <table className="text-gray-700" style={{ width: 250 }}>
      <tr>
        <th className="border px-2 py-1">Quantity</th>
        <th className="border px-2 py-1">Discount</th>
      </tr>
      {(rules || []).map((r) => (
        <tr key={r.id}>
          <td className="border px-2 py-1">{getRange(r)}</td>
          <td className="border px-2 py-1">{getDiscount(r)}</td>
        </tr>
      ))}
    </table>
  )
}

export default BulkPricingTable
