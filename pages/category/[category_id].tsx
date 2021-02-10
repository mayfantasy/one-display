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

const CategoryPage = () => {
  const router = useRouter()

  // Customer
  const customerData = useCustomer()

  // Category & it's sub-categories
  const categoryId = router.query.category_id as string
  const [category, setCategory] = useState<ISimpleCategory>()

  useEffect(() => {
    if (categoryId) {
      setCategory(getCategoryTreeByIdPath([Number(categoryId)]))
    }
  }, [categoryId])

  // Products
  const [products, setProducts] = useState<IProductData[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (categoryId) {
      setLoading(true)
      getProductsByCategoryIdRequest(categoryId).then((res) => {
        setProducts(res.data.result.products)
        setLoading(false)
      })
    }
  }, [categoryId])

  // Pricing

  const [pricing, setPricing] = useState<IProductPriceMap>()
  const [pricingLoading, setPricingLoading] = useState(false)

  useEffect(() => {
    if (
      products?.length &&
      customerData.data &&
      customerData.data.customerGroupId
    ) {
      setPricingLoading(true)
      getProductPricingRequest({
        customer_group_id: customerData.data.customerGroupId,
        items: products.map((p) => ({ product_id: p.id })),
      }).then((res) => {
        const data = res.data.result.pricing
        const map = data.reduce((a, c) => {
          a[c.product_id] = c
          return a
        }, {} as IProductPriceMap)
        setPricing(map)
        console.log(pricing)
        setPricingLoading(false)
      })
    }
  }, [products, customerData.data])

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
