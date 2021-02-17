import { AxiosResponse } from 'axios'
import { api } from 'requests/client'
import {
  IAddCartItemsPayload,
  ICart,
  ICheckoutUrl,
  ILineItem,
  IUpdateCartItemPayload,
} from 'types/cart.types'
import { ICategory } from 'types/category.types'

// Cart id is stored in cookie.
// If can not find cart_id in cookie
// a new cart is generated automatically
export const getCartRequest = (): Promise<
  AxiosResponse<{ result: { cart: ICart } }>
> => {
  return api.get(`/api/cart`)
}

export const deleteCartRequest = (
  cartId: string
): Promise<AxiosResponse<{ result: { cart: ICart } }>> => {
  return api.delete(`/api/cart/${cartId}`)
}

// Cart items
export const addCartItemRequest = (
  cartId: string,
  payload: IAddCartItemsPayload
): Promise<AxiosResponse<{ result: { cart: ICart } }>> => {
  return api.post(`/api/cart/${cartId}/items/add`, payload)
}

export const updateCartItemRequest = (
  cartId: string,
  cartItemId: string,
  payload: IUpdateCartItemPayload
): Promise<AxiosResponse<{ result: { cart: ICart } }>> => {
  return api.put(`/api/cart/${cartId}/items/${cartItemId}`, payload)
}

export const removeCartItemRequest = (
  cartId: string,
  cartItemId: string
): Promise<AxiosResponse<{ result: { cart: ICart } }>> => {
  return api.delete(`/api/cart/${cartId}/items/${cartItemId}`)
}

// Checkout Url
export const createCheckoutUrlRequest = (
  cartId: string
): Promise<AxiosResponse<{ result: { url: string } }>> => {
  return api.post(`/api/cart/${cartId}/checkout-url`)
}
