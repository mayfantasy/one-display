import { RecursivePartial } from '@framework/api/utils/types'
import { LoginMutation } from '@framework/schema'
import { NextApiRequest, NextApiResponse } from 'next'
import { ILoginCredentials } from 'types/auth.types'
import concatHeader from '../../../framework/bigcommerce/api/utils/concat-cookie'
import { getConfig } from '../../../framework/bigcommerce/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = /* GraphQL */ `
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        result
      }
    }
  `
  const credentials = req.body as ILoginCredentials

  if (req.method === 'POST') {
    try {
      const config = getConfig()
      const { data, res: response } = await config.fetch<
        RecursivePartial<LoginMutation>
      >(query, { variables: credentials })

      /**
       * |--------------------------------
       * | Bigcommerce returns a Set-Cookie header with the auth cookie
       */
      let cookie = response.headers.get('Set-Cookie')

      if (cookie && typeof cookie === 'string') {
        let arr = [cookie]

        // ----> Hotfix for for " HttpOnly, " bug
        if (cookie.includes('HttpOnly,')) {
          cookie = cookie.replace('HttpOnly,', 'HttpOnly;@@')
          arr = cookie.split('@@')
        }

        arr.forEach((c) => {
          // In development, don't set a secure cookie or the browser will ignore it
          if (process.env.NODE_ENV !== 'production') {
            c = c.replace('; Secure', '')
            // SameSite=none can't be set unless the cookie is Secure
            // bc seems to sometimes send back SameSite=None rather than none so make
            // this case insensitive
            c = c.replace(/; SameSite=none/gi, '; SameSite=lax')
          }

          res.setHeader(
            'Set-Cookie',
            concatHeader(res.getHeader('Set-Cookie'), c)!
          )
        })
      }

      res.statusCode = 200
      res.json({ result: data.login?.result })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
