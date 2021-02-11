import { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { api as monfent } from 'requests/monfent'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const object_id = req.query.object_id as string
      const templateRes = await monfent.get<{
        result: { sku: string; templates: string[] }
      }>(`/object/jw-beaver-website/product_print_templates/get/${object_id}`)
      res.statusCode = 200
      res.json({ result: { templates: templateRes.data.result.templates } })
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
