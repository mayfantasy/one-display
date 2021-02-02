import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // const id = req.query.cart_id as string
    // Get a cart_id from cookie
    const cart_id = req.cookies.cart_id
    const customer_id = req.cookies.customer_id

    console.log(cart_id, customer_id)

    if (cart_id) {
      try {
        console.log('==', ' Getting cart... ', '==')
        // 1. if the cart_id was found, get it
        const cartRes = await api.get(
          `/carts/${cart_id}?include=line_items.physical_items.options`
        )
        res.statusCode = 200
        res.json({ result: { cart: cartRes.data.data } })
      } catch (e) {
        // If cart not on BC server, create one
        if (e?.response?.status === 404) {
          console.log('==', ' Creating cart... ', '==')
          const createCartRes = await api.post(
            `/carts?include=line_items.physical_items.options`,
            { customer_id: Number(customer_id), line_items: [] }
          )
          res.statusCode = 200
          res.json({ result: { cart: createCartRes.data.data } })
        } else {
          res.statusCode = 500
          console.log(JSON.stringify(e, null, 2))
          res.json({ error: e.message })
        }
      }
    } else {
      try {
        console.log('==', ' Creating cart... ', '==')
        // 2. if the cart_id was not found, create it
        const createCartRes = await api.post(
          `/carts?include=line_items.physical_items.options`,
          { customer_id: Number(customer_id), line_items: [] }
        )
        res.statusCode = 200
        res.json({ result: { cart: createCartRes.data.data } })
      } catch (e) {
        res.statusCode = 500
        console.log(JSON.stringify(e, null, 2))
        res.json({ error: e.message })
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      const id = req.query.cart_id as string
      const cartRes = await api.delete(`/carts/${id}`)
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
