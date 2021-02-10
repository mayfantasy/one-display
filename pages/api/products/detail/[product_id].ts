import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { IProduct } from 'types/product.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const product_id = req.query.product_id as string
      const productsRes = await api.get<IProduct>(
        `/catalog/products/${product_id}?include=images,bulk_pricing_rules`
      )
      res.statusCode = 200
      res.json({ result: { product: productsRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      console.log(JSON.stringify(e, null, 2))
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
