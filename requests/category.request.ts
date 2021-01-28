import { AxiosResponse } from 'axios'
import { api } from 'requests/client'
import { ICategory } from 'types/category.types'

export const getCategoryByIdRequest = (
  id: string
): Promise<AxiosResponse<{ result: { category: ICategory } }>> => {
  return api.get(`/api/category/${id}`)
}
