import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { IUpsertCustomerAttributeValuesPayloadItem } from 'types/customer.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const payload = req.body as IUpsertCustomerAttributeValuesPayloadItem[]
      const upsertCustomerAttributesRes = await api.post(
        `/customers/attribute-values`,
        payload
      )
      res.statusCode = 200
      res.json({ result: { checkout: upsertCustomerAttributesRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
