import { getCategoryTreeByIdPath } from 'helpers/category.helpers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  getProductByProductIdRequest,
  getProductsByCategoryIdRequest,
} from 'requests/products.request'
import { ISimpleCategory } from 'types/category.types'
import { IProductData } from 'types/product.types'

export const useProduct = () => {
  const router = useRouter()
  const product_id = router.query.product_id as string
  const [product, setProduct] = useState<IProductData>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product_id) {
      setLoading(true)
      getProductByProductIdRequest(Number(product_id))
        .then((res) => {
          setProduct(res.data.result.product)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [product_id])

  return { product, loading }
}

export const useCategoryProducts = () => {
  const router = useRouter()
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

  return { category, categoryId, products, loading }
}
