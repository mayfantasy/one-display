import { AxiosResponse } from 'axios'
import { api } from 'requests/client'
import { ICategory } from 'types/category.types'
import {
  IOrder,
  IOrderProductWithImages,
  IOrderShippingAddress,
} from 'types/order.types'

export const getCustomerOrderRequest = (
  customerId: number
): Promise<AxiosResponse<{ result: { orders: IOrder[] } }>> => {
  return api.get(`/api/orders/${customerId}`)
}

export const getOrderProductsByOrderId = (
  orderId: number
): Promise<
  AxiosResponse<{ result: { products: IOrderProductWithImages[] } }>
> => {
  return api.get(`/api/orders/products/${orderId}`)
}

export const getOrderShippingAddressByOrderId = (
  orderId: number
): Promise<
  AxiosResponse<{ result: { addresses: IOrderShippingAddress[] } }>
> => {
  return api.get(`/api/orders/shipping-address/${orderId}`)
}
