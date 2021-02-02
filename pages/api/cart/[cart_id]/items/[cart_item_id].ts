import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { IUpdateCartItemPayload } from 'types/cart.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const cart_id = req.query.cart_id as string
      const cart_item_id = req.query.cart_item_id as string
      const payload = req.body as IUpdateCartItemPayload

      const cartRes = await api.put(
        `/carts/${cart_id}/items/${cart_item_id}?include=line_items.physical_items.options`,
        payload
      )
      res.statusCode = 200
      res.json({ result: { cart: cartRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else if (req.method === 'DELETE') {
    try {
      const cart_id = req.query.cart_id as string
      const cart_item_id = req.query.cart_item_id as string
      const cartRes = await api.delete(
        `/carts/${cart_id}/items/${cart_item_id}`
      )
      res.statusCode = 200
      res.json({ result: { cart: cartRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
