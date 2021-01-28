import { ProductNode } from '@framework/api/operations/get-all-products'
import { AxiosResponse } from 'axios'
import { api } from 'requests/client'
import { ICategory } from 'types/category.types'
import { IProduct } from 'types/product.types'

export const getProductsByCategoryIdRequest = (
  id: string
): Promise<AxiosResponse<{ result: { products: IProduct[] } }>> => {
  return api.get(`/api/products/${id}`)
}
