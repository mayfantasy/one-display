import { CURRENCY_PREFIX } from 'helpers/constant.helpers'

interface IProps {
  amount: string | number
}

const PriceItem = (props: IProps) => {
  const { amount } = props
  return (
    <span>
      {CURRENCY_PREFIX} {Number(amount).toFixed(2)}
    </span>
  )
}

export default PriceItem
