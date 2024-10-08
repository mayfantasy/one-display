import Button from 'components/common/Button'
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
import { useUI } from '@components/ui/context'
import { useAddToCart } from 'hooks/cart.hooks'
import BulkPricingTable from './BulkPricingTable'
import { useTemplateList } from 'hooks/template.hooks'
import Layout from 'components/common/Layout'
import { useCustomerId } from 'hooks/customer.hooks'
import { useProductQuantity } from 'hooks/product-quantity.hooks'
import Skeleton from 'react-loading-skeleton'
import { getCategoryTreeByIdPath } from 'helpers/category.helpers'
import BreadCrumb from '@components/common/BreadCrumb'
import { usePsd } from 'hooks/product-secondary-description'

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
  const customerId = useCustomerId()

  const { product, loading: loadingProduct } = useProduct()
  const {
    quantity,
    setQuantity,
    handleQuantity,
    increaseQuantity,
  } = useProductQuantity(product)
  const { price } = useProductPricing(product, quantity)
  const { templates } = useTemplateList(product)
  const { psd, loading: loadingPsd } = usePsd(product)

  const { openModal } = useUI()

  const [currentTab, setCurrentTab] = useState<ITabKey>('description')

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
  const { addToCart, loading: addingToCart } = useAddToCart(
    product?.id,
    quantity
  )

  const onBackToTop = () => {
    if (window) {
      window.scrollTo({
        top: 0,
      })
    }
  }

  /**
   * ||===========
   * || Render
   */
  const images = product?.images.length
    ? product.images.sort((a, b) => a.sort_order - b.sort_order)
    : []

  return (
    <Layout pageTitle={product?.name || ''}>
      <div className="mt-32 container m-auto">
        <div>
          <Button
            onClick={onBackToTop}
            primary
            className="fixed bottom-2 right-2"
          >
            Back to Top
          </Button>
        </div>
        {loadingProduct && (
          <div className="md:flex">
            <div className="md:w-1/2 md:pr-1">
              <Skeleton height={300} />
            </div>
            <div className="md:w-1/2">
              <Skeleton height={45} />
              <Skeleton height={36} />
              <Skeleton height={90} />
            </div>
          </div>
        )}
        {!loadingProduct && product && (
          <main className="py-4">
            {/* Upper section */}
            {/* Breadcrumb */}
            <div className="py-1 pb-5">
              <BreadCrumb
                category={product.categories[0]}
                subCategory={product.categories[1]}
              />
            </div>
            <div className="md:flex">
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
                  style={{ fontSize: '0.9rem' }}
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />

                <br />
                {!customerId && (
                  <div>
                    <Button
                      aria-label="Login to view price and purchase"
                      primary
                      onClick={openModal}
                    >
                      Login to view price and purchase
                    </Button>
                  </div>
                )}
                {customerId && (
                  <>
                    {/* Price */}
                    <div className="mb-2">
                      {/* <pre>{JSON.stringify(price, null, 2)}</pre> */}
                      {price && <ProductPrice price={price} />}
                    </div>

                    {/* Quantity */}
                    {product.inventory_level !== 0 ? (
                      <div className="flex">
                        <div className="mr-2">
                          <QuantityInput
                            quantity={quantity}
                            increaseQuantity={increaseQuantity}
                            handleQuantity={handleQuantity}
                            handleBlur={() => setQuantity(quantity)}
                          />
                        </div>

                        {customerId && (
                          <div>
                            <Button
                              aria-label="Add to Cart"
                              primary
                              onClick={addToCart}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button>Out of Stock</Button>
                    )}
                  </>
                )}

                <br />
                <br />

                {/* Bulk pricing goes here */}
                {!!price?.bulk_pricing?.length && customerId && (
                  <div>
                    <BulkPricingTable rules={price?.bulk_pricing} />
                  </div>
                )}
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
                      <div style={{ fontSize: '0.9rem' }}>
                        {loadingPsd ? (
                          <div>Loading product description...</div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: psd || product.description,
                            }}
                          />
                        )}
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
