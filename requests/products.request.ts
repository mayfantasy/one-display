import { ProductNode } from '@framework/api/operations/get-all-products'
import { AxiosResponse } from 'axios'
import { api } from 'requests/client'
import { ICategory } from 'types/category.types'
import { IProductData } from 'types/product.types'

export const getProductsByCategoryIdRequest = (
  id: string
): Promise<AxiosResponse<{ result: { products: IProductData[] } }>> => {
  return api.get(`/api/products/${id}`)
}

export const getProductByProductIdRequest = (
  id: number
): Promise<AxiosResponse<{ result: { product: IProductData } }>> => {
  return api.get(`/api/products/detail/${id}`)
}
