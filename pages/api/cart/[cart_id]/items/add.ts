import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { IAddCartItemsPayload, ILineItem } from 'types/cart.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const cart_id = req.query.cart_id as string
      const payload = req.body as IAddCartItemsPayload
      const addCartItemRes = await api.post(
        `/carts/${cart_id}/items?include=line_items.physical_items.options`,
        payload
      )
      res.statusCode = 200
      res.json({ result: { cart: addCartItemRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
