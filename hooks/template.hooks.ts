import { TEMPLATE_LIST_CUSTOM_FIELD_KEY } from 'helpers/constant.helpers'
import { useEffect, useState } from 'react'
import { getProductTemplateListRequest } from 'requests/products.request'
import { IProductData } from 'types/product.types'

export const useTemplateList = (product?: IProductData) => {
  const [templates, setTemplates] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  // Get ID from custom fields
  const getTemplateListObjectId = (product: IProductData) => {
    const foundCustomField = product.custom_fields.find(
      (p) => p.name === TEMPLATE_LIST_CUSTOM_FIELD_KEY
    )
    return foundCustomField?.value
  }

  // Get template list
  useEffect(() => {
    if (product) {
      const objectId = getTemplateListObjectId(product)
      if (objectId) {
        setLoading(true)
        getProductTemplateListRequest(objectId)
          .then((res) => {
            const templates = res.data.result.templates
            setTemplates(templates)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
  }, [product])

  return { templates, loading }
}
