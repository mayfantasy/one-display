import { CURRENCY_PREFIX } from 'helpers/constant.helpers'
import { IProductPrice } from 'types/product-pricing.types'
import { IProductData } from 'types/product.types'

interface IProps {
  price?: IProductPrice
}

const ProductPrice = (props: IProps) => {
  const { price } = props

  if (!price) {
    return <></>
  }

  const isCheaper = price.price.as_entered !== price.calculated_price.as_entered
  const regularPrice = <span>{price.price.as_entered.toFixed(2)}</span>
  const calculatedPrice = (
    <span>
      <span className="line-through text-gray-500">{regularPrice}</span>{' '}
      <span className="text-red-500 text-xl">
        {price.calculated_price.as_entered.toFixed(2)}
      </span>
    </span>
  )

  return (
    <span>
      <span>{CURRENCY_PREFIX}</span>{' '}
      <>{isCheaper ? calculatedPrice : regularPrice}</>
    </span>
  )
}
export default ProductPrice
