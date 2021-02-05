import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/serverV2'
import { api as apiV3 } from 'requests/server'
import { IImage } from 'types/category.types'
import { IProductImage } from 'types/image.types'
import {
  IOrder,
  IOrderProduct,
  IOrderProductWithImages,
} from 'types/order.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const customer_id = req.query.customer_id as string

      // Get Orders
      const orderRes = await api.get<IOrder[]>(
        `/orders?customer_id=${customer_id}`
      )

      res.statusCode = 200
      res.json({ result: { orders: orderRes.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
