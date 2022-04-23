import ProductCard from '@components/product/ProductCard'
import {
  getCategoryTreeByIdPath,
  getSubCategoryBlockId,
} from 'helpers/category.helpers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { getHashFromPath } from 'helpers/route.helpers'

import { useProductsPricing } from 'hooks/pricing.hooks'
import { useCategoryProducts } from 'hooks/product.hooks'
import Layout from 'components/common/Layout'
import Skeleton from 'react-loading-skeleton'
import Button from '@components/common/Button'
import { useCustomerId } from 'hooks/customer.hooks'
import { useUI } from '@components/ui/context'

const CategoryPage = () => {
  const router = useRouter()

  // Hooks
  const { category, loading, categoryId, products } = useCategoryProducts()
  const { pricing } = useProductsPricing(products)

  const customerId = useCustomerId()
  const { openModal } = useUI()

  // Handle hash
  useEffect(() => {
    const hash = getHashFromPath(router.asPath)
    if (hash && products) {
      const element = document.querySelector(hash)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }
  }, [router.asPath, products])

  const getProductLinesBySubCategoryId = (id: number) => {
    const subCategoryProducts = products
      ?.filter((p) => p.categories.includes(id))
      .filter((p) => p.is_visible)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {subCategoryProducts && subCategoryProducts.length ? (
          subCategoryProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              productPrice={pricing?.[p.id]}
            />
          ))
        ) : (
          <div>
            <i className="text-gray-500">
              No items yet. Please contact us for the latest product
              information.
            </i>
          </div>
        )}
      </div>
    )
  }

  return (
    <Layout
      pageTitle={category?.name}
      banner={{
        bg: {
          src:
            getCategoryTreeByIdPath([category?.id || -1])?.banner_image?.src ||
            '',
          mask: 'rgba(0,0,0,0.4)',
          height: '500px',
        },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-36">
              <h1 className="text-white text-5xl text-center leading-tight mb-8">
                <span className="max-w-lg inline-block">{category?.name}</span>
              </h1>
              <p className="text-white text-center">
                <span className="max-w-lg inline-block">
                  {category?.description}
                </span>
              </p>
              <br />
              {/* {category?.pdfUrl && (
                <p className="text-center">
                  {!customerId && (
                    <Button
                      aria-label="Login to view price and purchase"
                      primary
                      onClick={openModal}
                    >
                      Login to view Catalogue
                    </Button>
                  )}
                  {customerId && (
                    <a href={category?.pdfUrl} target="_blank">
                      <Button primary>Download Catalogue</Button>
                    </a>
                  )}
                </p>
              )} */}
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    >
      <div className="container m-auto py-4">
        {/* <h2 className="text-4xl my-8">{category?.name}</h2> */}
        <div>
          {!!category?.children?.length ? (
            <div>
              {category.children.map((sc) => (
                <div className="mb-12" key={sc.id}>
                  <h3
                    className="text-2xl my-4 font-bold"
                    id={getSubCategoryBlockId(sc.id)}
                  >
                    {sc.name}
                  </h3>
                  {loading && <Skeleton height={200} className="w-full" />}
                  {!loading && getProductLinesBySubCategoryId(sc.id)}
                </div>
              ))}
            </div>
          ) : (
            <>
              {loading && <Skeleton height={200} className="w-full" />}
              {!loading && getProductLinesBySubCategoryId(Number(categoryId))}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage
