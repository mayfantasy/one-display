import { useUI } from '@components/ui/context'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  getProductByProductIdRequest,
  searchProductsRequest,
} from 'requests/products.request'
import { IProductData } from 'types/product.types'

export const useSearch = () => {
  const router = useRouter()
  const keyword = router.query.key as string
  const [products, setProducts] = useState<IProductData[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (keyword) {
      setLoading(true)
      searchProductsRequest(keyword)
        .then((res) => {
          setProducts(res.data.result.products)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [keyword])

  return { products, keyword, loading }
}
