import { Layout } from '@components/common'
import ProductCard from '@components/product/ProductCard'

import { ProductNode } from '@framework/api/operations/get-all-products'
import useSearch from '@framework/products/use-search'
import useCustomer from '@framework/use-customer'
import {
  getCategoryTreeByIdPath,
  getSubCategoryBlockId,
} from 'helpers/category.helpers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCategoryByIdRequest } from 'requests/category.request'
import { getProductsByCategoryIdRequest } from 'requests/products.request'
import { getProductPricingRequest } from 'requests/product-pricing.request'
import useSWR from 'swr'
import { ICategory, ISimpleCategory } from 'types/category.types'
import { IProductPrice, IProductPriceMap } from 'types/product-pricing.types'
import { IProductData } from 'types/product.types'
import { getHashFromPath } from 'helpers/route.helpers'
import Button from '@components/common/Button'
import { useCategoryProducts } from 'hooks/product.hooks'
import { useProductsPricing } from 'hooks/pricing.hooks'

const CategoryPage = () => {
  const router = useRouter()

  // Hooks
  const { category, categoryId, products } = useCategoryProducts()
  const { pricing } = useProductsPricing(products)

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
    const subCategoryProducts = products?.filter((p) =>
      p.categories.includes(id)
    )
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {subCategoryProducts &&
          subCategoryProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              productPrice={pricing?.[p.id]}
            />
          ))}
      </div>
    )
  }

  return (
    <Layout
      pageTitle={category?.name}
      banner={{
        bg: {
          src: '/bg/categories.jpeg',
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
                  {getProductLinesBySubCategoryId(sc.id)}
                </div>
              ))}
            </div>
          ) : (
            getProductLinesBySubCategoryId(Number(categoryId))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage
