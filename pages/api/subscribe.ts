import { NextApiRequest, NextApiResponse } from 'next'
import { api as monfent } from 'requests/monfent'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const email = req.body.email as string
      if (email) {
        await monfent.post(`/email/send`, {
          meta: {
            collection_handle: 'jw-beaver-website',
            schema_handle: 'jwbeaver_email_template',
            id: '290832771375432192',
          },
          to_email: 'hans@mayfantasy.com',
          data: {
            customer_email: email,
          },
        })
        res.statusCode = 200
        res.json({ result: { subscribe: true } })
      }
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
