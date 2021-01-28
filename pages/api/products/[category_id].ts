import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const id = req.query.category_id as string
      const productsRes = await api.get(
        `/catalog/products?categories:in=${id}&include=images,primary_image,bulk_pricing_rules`
      )
      res.statusCode = 200
      res.json({ result: { products: productsRes.data.data } })
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
