import { ProductNode } from '@framework/api/operations/get-all-products'
import { AxiosResponse } from 'axios'
import { CHANNEL_ID, CURRENCY_CODE } from 'helpers/constant.helpers'
import { api } from 'requests/client'
import { ICategory } from 'types/category.types'
import {
  IProductPrice,
  IProductPricingPayload,
} from 'types/product-pricing.types'
import { IProduct } from 'types/product.types'

export const getProductPricingRequest = (
  payload: IProductPricingPayload
): Promise<AxiosResponse<{ result: { pricing: IProductPrice[] } }>> => {
  return api.post(`/api/product-pricing`, {
    ...payload,
    currency_code: CURRENCY_CODE,
    channel_id: CHANNEL_ID,
  })
}
