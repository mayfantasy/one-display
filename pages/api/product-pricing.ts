import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { IProductPricingPayload } from 'types/product-pricing.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const payload = req.body as IProductPricingPayload

      const productPricingRes = await api.post(`/pricing/products`, payload)
      res.statusCode = 200
      res.json({ result: { pricing: productPricingRes.data.data } })
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
