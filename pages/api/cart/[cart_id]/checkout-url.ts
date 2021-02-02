import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const cart_id = req.query.cart_id as string
      const createCheckoutUrlRes = await api.post(
        `/carts/${cart_id}/redirect_urls`
      )
      res.statusCode = 200
      res.json({ result: { checkout: createCheckoutUrlRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
