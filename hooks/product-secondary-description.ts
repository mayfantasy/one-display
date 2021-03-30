import { PRODUCT_SECONDARY_DESCRIPTION_CUSTOM_FIELD_KEY } from 'helpers/constant.helpers'
import { useEffect, useState } from 'react'
import { getPsdRequest } from 'requests/products.request'
import { IProductData } from 'types/product.types'

export const usePsd = (product?: IProductData) => {
  const [psd, setPsd] = useState<string>()
  const [loading, setLoading] = useState(false)

  const getPsdObjectId = (product: IProductData) => {
    const foundCustomField = product.custom_fields.find(
      (p) => p.name === PRODUCT_SECONDARY_DESCRIPTION_CUSTOM_FIELD_KEY
    )
    return foundCustomField?.value
  }

  // Get psd
  useEffect(() => {
    if (product) {
      const objectId = getPsdObjectId(product)
      if (objectId) {
        setLoading(true)
        getPsdRequest(objectId)
          .then((res) => {
            const psd = res.data.result.psd
            setPsd(psd)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
  }, [product])

  return { psd, loading }
}
