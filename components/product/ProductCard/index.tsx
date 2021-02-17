import Button from '@components/common/Button'
import { ProductNode } from '@framework/api/operations/get-product'
import { pageRoutes } from 'helpers/route.helpers'
import Image from 'next/image'
import Link from 'next/link'
import { ISimpleCategory } from 'types/category.types'
import { IProductPrice } from 'types/product-pricing.types'
import { IProductData } from 'types/product.types'
import BasicPrice from '../BasicPrice'
import PriceRange from '../MyPrice'
import MyPrice from '../MyPrice'
import useAddItem from '@framework/cart/use-add-item'
import { useState } from 'react'
import { useUI } from '@components/ui/context'
import { addCartItemRequest } from 'requests/cart.request'
import { getCartItemsCount } from 'helpers/cart.helpers'
import { useAddToCart, useCart } from 'hooks/cart.hooks'
import { useCookies } from 'react-cookie'
import { useCartId } from 'hooks/cart-id.hooks'
import SquareImage from '@components/SquareImage'

interface IProps {
  product: IProductData
  productPrice?: IProductPrice
}

const ProductCard = (props: IProps) => {
  const { product, productPrice } = props

  // Handle add to cart
  const { addToCart, loading } = useAddToCart(product.id)

  // Render
  return (
    <div>
      <Link href={pageRoutes.productPage(product.id).url!}>
        <a className="block w-full rounded border border-gray-300 hover:border-blue-700 overflow-hidden cursor-pointer bg-gray-100">
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
