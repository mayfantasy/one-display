import { Layout } from '@components/common'
import Button from '@components/common/Button'
import QuantityInput from '@components/form/QuantityInput'
import BasicPrice from '@components/product/BasicPrice'
import SquareImage from '@components/SquareImage'
import { useProductPricing } from 'hooks/pricing.hooks'
import { useProduct } from 'hooks/product.hooks'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { getProductByProductIdRequest } from 'requests/products.request'
import { IImage } from 'types/category.types'
import { IProductImageData } from 'types/image.types'
import { IProductData } from 'types/product.types'
import ProductPrice from 'components/product/ProductPrice'
import { useCartId } from 'hooks/cart-id.hooks'
import { useUI } from '@components/ui/context'
import { useAddToCart } from 'hooks/cart.hooks'
import BulkPricingTable from './BulkPricingTable'
import { useTemplateList } from 'hooks/template.hooks'

type ITabKey = 'description' | 'templates'
interface ITab {
  key: ITabKey
  name: string
}

interface ITabContent {
  key: ITabKey
  content: React.ReactNode
}

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)

  const { product } = useProduct()
  const { price } = useProductPricing(product, quantity)
  const { templates } = useTemplateList(product)

  const [currentTab, setCurrentTab] = useState<ITabKey>('description')

  /**
   * ||===========
   * || Quantity
   */
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (Number.isInteger(val) && val > 0) {
      setQuantity(val)
    }
  }

  // increase quantity
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n
    if (Number.isInteger(val)) {
      if (val > 0) {
        setQuantity(val)
      }
      if (val <= 0) {
        setQuantity(1)
      }
    }
  }

  /**
   * ||===========
   * || Image
   */
  const [currentImage, setCurrentImage] = useState<IProductImageData>()
  useEffect(() => {
    if (product) {
      setCurrentImage(product.images?.[0])
    }
  }, [product])

  /**
   * ||===========
   * || Add to cart
   */
  const { addToCart, loading } = useAddToCart(product?.id, quantity)

  /**
   * ||===========
   * || Render
   */
  const images = product?.images.length ? product.images : []

  return (
    <Layout>
      <div>
        {product && (
          <main className="container m-auto">
            {/* Upper section */}
            <div className="mt-24 md:flex">
              {/* Images */}
              <div className="md:w-1/2 w-full md:pr-1 pr-0">
                <SquareImage
                  noScaleEffect
                  src={currentImage?.url_zoom}
                  alt={product?.name}
                />
                <div className="w-full flex">
                  {images.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => setCurrentImage(i)}
                      className={`w-24 p-1 mr-1 rounded overflow-hidden ${
                        currentImage?.id === i.id
                          ? 'border border-blue-700'
                          : ''
                      }`}
                    >
                      <SquareImage
                        noScaleEffect
                        src={i?.url_standard}
                        alt={product?.name}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/*Info & Actions */}
              <div className="md:w-1/2 w-full md:pl-1 pl-0">
                {/* Title */}
                <h1 className="text-3xl font-bold">{product?.name}</h1>
                {/* Model $ */}
                <h2 className="text-2xl text-gray-400">
                  <span>Model #</span>
                  <span>{product.sku}</span>
                </h2>

                <br />

                {/* Description */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />

                <br />

                {/* Price */}
                <div className="mb-2">
                  {/* <pre>{JSON.stringify(price, null, 2)}</pre> */}
                  {price && <ProductPrice price={price} />}
                </div>

                {/* Quantity */}
                <div className="flex">
                  <div className="mr-2">
                    <QuantityInput
                      quantity={quantity}
                      increaseQuantity={increaseQuantity}
                      handleQuantity={handleQuantity}
                      handleBlur={() => setQuantity(quantity)}
                    />
                  </div>

                  <div>
                    <Button
                      aria-label="Add to Cart"
                      primary
                      onClick={addToCart}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <br />
                <br />

                {/* Bulk pricing goes here */}
                <div>
                  <BulkPricingTable rules={product.bulk_pricing_rules} />
                </div>
              </div>
            </div>

            <br />

            {/* Lower section */}
            <div>
              {/* Tabs */}
              <div className="flex">
                {([
                  { name: 'Description', key: 'description' },
                  { name: 'Templates', key: 'templates' },
                ] as ITab[]).map((t) => (
                  <div
                    key={t.key}
                    onClick={() => setCurrentTab(t.key)}
                    className={`text-center px-6 py-3 rounded-t cursor-pointer ${
                      currentTab === t.key ? 'bg-gray-100 font-bold' : ''
                    }`}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
              {/* Content */}
              <div className="bg-gray-100">
                {([
                  {
                    key: 'description',
                    content: (
                      <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                      </div>
                    ),
                  },
                  {
                    key: 'templates',
                    content: templates ? (
                      <div className="flex">
                        {templates.map((t, i) => (
                          <a className="text-center block mr-4" href={t}>
                            <div className="flex justify-center">
                              <img
                                src="/pdf_file_icon.png"
                                style={{ width: 40 }}
                              />
                            </div>
                            <span className="underline">Template {i + 1}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <i className="text-gray-400">
                          No print templates for this product.
                        </i>
                      </div>
                    ),
                  },
                ] as ITabContent[]).map((c) => (
                  <div key={c.key}>
                    {currentTab === c.key && (
                      <div className="p-6" style={{ minHeight: 300 }}>
                        {c.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
    </Layout>
  )
}

export default ProductPage
