import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProductByProductIdRequest } from 'requests/products.request'
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
