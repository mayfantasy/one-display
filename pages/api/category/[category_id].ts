import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const id = req.query.category_id as string
      const categoryRes = await api.get(`/catalog/categories/${id}`)
      res.statusCode = 200
      res.json({ result: { category: categoryRes.data.data } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
