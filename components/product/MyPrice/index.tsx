import { CURRENCY_PREFIX } from 'helpers/constant.helpers'
import { IProductPrice } from 'types/product-pricing.types'
import { IProductData } from 'types/product.types'

interface IProps {
  product: IProductData
  productPrice: IProductPrice
}

const MyPrice = (props: IProps) => {
  const { product, productPrice } = props

  const isCheaper = product.price !== productPrice.calculated_price.as_entered
  const regularPrice = <span>{product.price.toFixed(2)}</span>
  const myPrice = (
    <span>
      <span className="line-through text-gray-500">{regularPrice}</span>{' '}
      <span className="text-red-500 text-xl">
        {productPrice.calculated_price.as_entered.toFixed(2)}
      </span>
    </span>
  )

  return (
    <span>
      <span>{CURRENCY_PREFIX}</span> <>{isCheaper ? myPrice : regularPrice}</>
    </span>
  )
}
export default MyPrice
