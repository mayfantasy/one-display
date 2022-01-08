import { NextApiRequest, NextApiResponse } from 'next'
import { api as monfent } from 'requests/monfent'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, first_name, last_name } = req.body
      if (email) {
        await monfent.post(`/email/send`, {
          meta: {
            collection_handle: 'jw-beaver-website',
            schema_handle: 'jwbeaver_email_template',
            id: '294455498701275648',
          },
          to_email: 'info@onedisplay.ca',
          data: {
            first_name,
            last_name,
            email,
          },
        })
        res.statusCode = 200
        res.json({ result: { sent: true } })
      }
    } catch (e: any) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
