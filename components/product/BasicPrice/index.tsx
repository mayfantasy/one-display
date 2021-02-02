import { CURRENCY_PREFIX } from 'helpers/constant.helpers'
import { IProduct } from 'types/product.types'

interface IProps {
  product: IProduct
}

const BasicPrice = (props: IProps) => {
  const { product } = props

  const isOnSale = product.price !== product.calculated_price
  const regularPrice = <span>{product.price.toFixed(2)}</span>
  const onSalePrice = (
    <span>
      <span className="line-through text-gray-500">{regularPrice}</span>{' '}
      <span className="text-red-500 text-xl">
        {product.calculated_price.toFixed(2)}
      </span>
    </span>
  )

  return (
    <span>
      <span>{CURRENCY_PREFIX}</span>{' '}
      <>{isOnSale ? onSalePrice : regularPrice}</>
    </span>
  )
}
export default BasicPrice
