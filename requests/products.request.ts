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

export const getProductTemplateListRequest = (
  objectId: string
): Promise<AxiosResponse<{ result: { templates: string[] } }>> => {
  return api.get(`/api/products/template/${objectId}`)
}

export const getPsdRequest = (
  objectId: string
): Promise<AxiosResponse<{ result: { psd: string } }>> => {
  return api.get(`/api/products/psd/${objectId}`)
}

export const searchProductsRequest = (
  keyword: string
): Promise<AxiosResponse<{ result: { products: IProductData[] } }>> => {
  return api.get(`/api/products/search?keyword=${keyword}`)
}
