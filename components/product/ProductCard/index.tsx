import Button from '@components/common/Button'
import { ProductNode } from '@framework/api/operations/get-product'
import { pageRoutes } from 'helpers/route.helpers'
import Image from 'next/image'
import Link from 'next/link'
import { ISimpleCategory } from 'types/category.types'
import { IProductPrice } from 'types/product-pricing.types'
import { IProduct } from 'types/product.types'
import BasicPrice from '../BasicPrice'
import PriceRange from '../MyPrice'
import MyPrice from '../MyPrice'
import useAddItem from '@framework/cart/use-add-item'
import { useState } from 'react'
import { useUI } from '@components/ui/context'
import { addCartItemRequest } from 'requests/cart.request'
import { getCartItemsCount } from 'helpers/cart.helpers'
import { useCart } from 'hooks/cart.hooks'
import { useCookies } from 'react-cookie'
import { useCartId } from 'hooks/cart-id.hooks'

interface IProps {
  product: IProduct
  productPrice?: IProductPrice
}

const ProductCard = (props: IProps) => {
  const { product, productPrice } = props

  const { openSidebar, setCartItemsCount } = useUI()
  const cartId = useCartId()

  // Handle add to cart
  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    if (cartId) {
      setLoading(true)
      try {
        const newCart = await addCartItemRequest(cartId, {
          line_items: [
            {
              product_id: product.id,
              quantity: 1,
            },
          ],
        })
        setCartItemsCount(getCartItemsCount(newCart.data.result.cart))
        openSidebar()
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
  }
  return (
    <div>
      <Link href={pageRoutes.productPage(product.id).url!}>
        <a className="block w-full rounded border border-gray-300 hover:border-blue-700 overflow-hidden cursor-pointer bg-gray-100">
          {/* Image */}
          <div className="w-full flex flex-row justify-center relative overflow-hidden bg-white">
            <div className="responsive-square" />
            <div className="w-full h-full absolute flex flex-row items-center">
              <img
                className="w-full transform hover:scale-125 transition duration-200"
                alt={product.name}
                src={product.primary_image?.url_standard || '/logo/logo.png'}
              />
            </div>
          </div>

          <div className="py-10 px-4 rounded-b">
            {/* Description */}
            <div className="mb-4">
              <div className="w-full top-10">
                <h2 className="text-lg text-left mb-4">
                  <strong>{product.name}</strong>
                </h2>
                <div
                  className="text-left text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>

            {/* Pricing */}
            <div>
              <div className="w-full top-0">
                {productPrice ? (
                  <MyPrice productPrice={productPrice} product={product} />
                ) : (
                  <BasicPrice product={product} />
                )}
              </div>
            </div>
          </div>
          {/* <div className="absolute w-full">123</div> */}
        </a>
      </Link>
      <div className="text-center">
        <Button
          aria-label="Add to Cart"
          primary
          onClick={addToCart}
          // loading={loading}
          // disabled={!variant}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
