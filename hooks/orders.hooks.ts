import { useEffect, useState } from 'react'
import {
  getCustomerOrderRequest,
  getOrderProductsByOrderId,
  getOrderShippingAddressByOrderId,
} from 'requests/order.request'
import {
  IOrder,
  IOrderProductWithImages,
  IOrderShippingAddress,
} from 'types/order.types'
import { useCustomerId } from './customer.hooks'

export const useOrders = () => {
  const customerId = useCustomerId()
  const [orders, setOrders] = useState<IOrder[]>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (customerId) {
      console.log(customerId)
      setLoading(true)
      getCustomerOrderRequest(customerId as number)
        .then((res) => {
          setOrders(res.data.result.orders)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [customerId])

  return { orders, loading }
}

export const useOrderProducts = (orderId: number) => {
  const [products, setProducts] = useState<IOrderProductWithImages[]>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (orderId) {
      setLoading(true)
      getOrderProductsByOrderId(orderId)
        .then((res) => {
          setProducts(res.data.result.products)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [orderId])

  return { products, loading }
}

export const useOrderShippingAddress = (orderId: number) => {
  const [address, setAddress] = useState<IOrderShippingAddress | undefined>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (orderId) {
      setLoading(true)
      getOrderShippingAddressByOrderId(orderId)
        .then((res) => {
          setAddress(res.data.result.addresses[0])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [orderId])

  return { address, loading }
}
