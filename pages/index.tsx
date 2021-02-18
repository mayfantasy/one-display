import rangeMap from '@lib/range-map'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllPages from '@framework/api/operations/get-all-pages'
import Subscribe from '@components/form/Subscribe'
import Layout from '@components/common/Layout'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      pageTitle="Home"
      banner={{
        bg: { src: '/bg/home.png', mask: 'rgba(0,0,0,0.2)' },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-56">
              <h1 className="text-white text-5xl text-center leading-tight mb-4">
                <span className="max-w-xl inline-block">
                  Welcome To JW Beaver Inc
                </span>
              </h1>
              <p className="text-white text-center mb-8">
                <span className="max-w-xl inline-block text-sm">
                  JW Beaver Inc Is A Canada Based <br />
                  Leading Store Fixtures Hang-Up Displays And Signage Supplier.
                </span>
              </p>
              <div className="flex flex-row justify-center text-white">
                <Subscribe />
              </div>
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    />
  )
}
