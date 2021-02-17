import useCustomer from '@framework/use-customer'
import { getPriceFromBulkPricing } from 'helpers/pricing.helpers'
import { useEffect, useState } from 'react'
import { getProductPricingRequest } from 'requests/product-pricing.request'
import { getProductByProductIdRequest } from 'requests/products.request'
import {
  IPricing,
  IProductPrice,
  IProductPriceMap,
} from 'types/product-pricing.types'
import { IProduct, IProductData } from 'types/product.types'

export const useProductPricing = (
  product?: IProductData,
  quantity?: number
) => {
  const [price, setPrice] = useState<IProductPrice>()
  const [bulkPrice, setBulkPrice] = useState<IProductPrice>()

  // Set initial bulk price
  useEffect(() => {
    if (price) {
      setBulkPrice(price)
    }
  }, [price])

  const [loading, setLoading] = useState(false)

  // Customer
  const customerData = useCustomer()
  useEffect(() => {
    if (product) {
      if (customerData.data?.customerGroupId) {
        setLoading(true)
        getProductPricingRequest({
          customer_group_id: customerData.data.customerGroupId,
          items: [{ product_id: product.id }],
        })
          .then((res) => {
            const p = res.data.result.pricing
            setPrice(p?.[0])
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        setPrice({
          product_id: product.id,
          variant_id: product.id,
          price: { as_entered: product.price },
          calculated_price: { as_entered: product.calculated_price },
        })
      }
    }
  }, [product, customerData.data?.customerGroupId])

  // Update bulk price when quantity changes
  useEffect(() => {
    if (price) {
      const c = getPriceFromBulkPricing(
        product?.bulk_pricing_rules || [],
        price.calculated_price.as_entered || 0,
        quantity || 1
      )
      setBulkPrice({
        ...price,
        calculated_price: {
          ...price.calculated_price,
          as_entered: c,
        },
      })
    }
  }, [quantity])

  return { price: bulkPrice, loading }
}

export const useProductsPricing = (products: IProductData[] | undefined) => {
  const customerData = useCustomer()
  const [pricing, setPricing] = useState<IProductPriceMap>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (
      products?.length &&
      customerData.data &&
      customerData.data.customerGroupId
    ) {
      setLoading(true)
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
        setLoading(false)
      })
    }
  }, [products, customerData.data])
  return { pricing, loading }
}
