// object/jw-beaver-website/jwbeaver_page_about_us/get/293176536418222596'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/monfent'
import { IProduct } from 'types/product.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const productsRes = await api.get(
        'object/jw-beaver-website/jwbeaver_contact_us_page/get/293725732392141316'
      )
      res.statusCode = 200
      res.json({ result: productsRes.data.result })
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
