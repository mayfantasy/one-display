import { NextApiRequest, NextApiResponse } from 'next'
import { api as apiV2 } from 'requests/serverV2'
import { api as apiV3 } from 'requests/server'
import { IOrderShippingAddress } from 'types/order.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const order_id = req.query.order_id as string
      // Get products for each order
      const addressRes = await apiV2.get<IOrderShippingAddress[]>(
        `/orders/${order_id}/shipping_addresses`
      )

      res.statusCode = 200
      res.json({ result: { addresses: addressRes.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
