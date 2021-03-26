import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'
import { IProductPrice } from 'types/product-pricing.types'
import { IProductData } from 'types/product.types'
import BasicPrice from '../BasicPrice'
import MyPrice from '../MyPrice'
import SquareImage from '@components/SquareImage'
import { useAddToCart } from 'hooks/cart.hooks'
import { useCustomerId } from 'hooks/customer.hooks'
import Button from '@components/common/Button'
import { useUI } from '@components/ui/context'

interface IProps {
  product: IProductData
  productPrice?: IProductPrice
}

const ProductCard = (props: IProps) => {
  const { product, productPrice } = props

  // Handle add to cart
  const { addToCart, loading } = useAddToCart(product.id)
  const customerId = useCustomerId()
  const { openModal } = useUI()

  // Render
  return (
    <div>
      <Link href={pageRoutes.productPage(product.id).url!}>
        <a
          style={{ borderRadius: 10 }}
          className="block w-full border border-gray-300 hover:border-blue-700 overflow-hidden cursor-pointer bg-gray-100"
        >
          {/* Image */}
          <SquareImage
            src={product.primary_image?.url_standard}
            alt={product.name}
          />

          <div className="py-10 px-4 rounded-b">
            {/* Description */}
            <div className="mb-4">
              <div className="w-full top-10">
                <h2 className="text-lg text-left mb-4" style={{ height: 48 }}>
                  <strong>{product.name}</strong>
                </h2>
                <div
                  style={{ height: 75 }}
                  className="text-left text-gray-600 overflow-ellipsis overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>

            {/* Pricing */}
            {customerId && (
              <div className="mb-4">
                <div className="w-full top-0">
                  {productPrice ? (
                    <MyPrice productPrice={productPrice} product={product} />
                  ) : (
                    <BasicPrice product={product} />
                  )}
                </div>
              </div>
            )}

            <div>
              <Button aria-label="Login to view price and purchase" primary>
                View Detail
              </Button>
            </div>
          </div>
          {/* <div className="absolute w-full">123</div> */}
        </a>
      </Link>
      {/* <div className="text-center">
        <Button
          aria-label="Add to Cart"
          primary
          onClick={addToCart}
          // loading={loading}
          // disabled={!variant}
        >
          Add to Cart
        </Button>
      </div> */}
    </div>
  )
}

export default ProductCard
