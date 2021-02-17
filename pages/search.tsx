import { Layout } from '@components/common'
import ProductCard from '@components/product/ProductCard'
import { useProductsPricing } from 'hooks/pricing.hooks'
import { useSearch } from 'hooks/search.hooks'

import { useRouter } from 'next/router'

const SearchPage = () => {
  const { products, keyword, loading } = useSearch()
  const { pricing } = useProductsPricing(products)
  const count = products?.length || 0
  return (
    <Layout pageTitle="Search" header={{ navColor: 'black' }}>
      <div className="container m-auto">
        <div className="w-full mt-36 mb-10">
          <h1 className="text-black text-4xl text-center leading-tight mb-8">
            <span className="max-w-lg inline-block">{`Search result for '${keyword}'`}</span>
          </h1>
          <p className="text-gray-500 text-center">
            <span className="max-w-lg inline-block text-2xl">
              {count} result{count > 1 && 's'} found
            </span>
          </p>
        </div>

        {products && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  productPrice={pricing?.[p.id]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SearchPage
