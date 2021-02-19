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

export const useSearchBar = () => {
  const router = useRouter()
  const queryKey = router.query.key as string
  const [keyword, setKeyword] = useState('')

  const { closeSearchbar } = useUI()

  useEffect(() => {
    router.prefetch('/search')
    console.log(router.pathname)
    if (router.pathname !== '/search') {
      closeSearchbar()
    }
  }, [])

  useEffect(() => {
    if (queryKey) {
      setKeyword(queryKey)
    }
  }, [router.query])

  const handleSearch = () => {
    router.push(
      {
        pathname: `/search`,
        query: keyword ? { key: keyword } : {},
      },
      undefined,
      { shallow: true }
    )
  }

  return { handleSearch, keyword, setKeyword, closeSearchbar }
}
