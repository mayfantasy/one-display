import { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { api as monfent } from 'requests/monfent'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const object_id = req.query.object_id as string
      const psdRes = await monfent.get<{
        result: { sku: string; description: string }
      }>(
        `/object/jw-beaver-website/product_secondary_description/get/${object_id}`
      )
      res.statusCode = 200
      res.json({ result: { psd: psdRes.data.result.description } })
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
