import { generateLoginUrl } from 'helpers/auth.helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { ICheckoutUrl } from 'types/cart.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const cart_id = req.query.cart_id as string
      const customer_id = req.cookies.customer_id
      const createCheckoutUrlRes = await api.post(
        `/carts/${cart_id}/redirect_urls`
      )
      const urls = createCheckoutUrlRes.data.data as ICheckoutUrl
      const loginUrl = generateLoginUrl(Number(customer_id), urls.checkout_url)
      // console.log(urls, loginUrl)
      res.statusCode = 200
      res.json({
        result: { url: loginUrl },
      })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
