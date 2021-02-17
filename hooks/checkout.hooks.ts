import { useEffect, useState } from 'react'
import { createCheckoutUrlRequest } from 'requests/cart.request'
import { ICheckoutUrl } from 'types/cart.types'

export const useCheckoutUrl = (cartId?: string) => {
  const [url, setUrl] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cartId) {
      setLoading(true)
      createCheckoutUrlRequest(cartId)
        .then((res) => {
          const u = res.data.result.url
          setUrl(u)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [cartId])

  return { url, loading }
}
