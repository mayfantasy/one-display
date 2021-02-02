import {
  decodeResettPasswordToken,
  generateResetPasswordToken,
} from 'helpers/auth.helpers'
import { pageRoutes } from 'helpers/route.helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/serverV2'
import { api as monfent } from 'requests/monfent'
import { IForgotPasswordPayload, IResetPasswordPayload } from 'types/auth.types'
import { ICustomer } from 'types/customer.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { password, confirmPassword } = req.body as IResetPasswordPayload
      const signature = req.query.signature as string

      if (password && confirmPassword && password === confirmPassword) {
        const decoded = decodeResettPasswordToken(signature)
        if (decoded?.customer_id) {
          console.log(decoded)
          const updatePasswordRes = await api.put<ICustomer>(
            `/customers/${decoded?.customer_id}`,
            {
              _authentication: {
                password,
                password_confirmation: confirmPassword,
              },
            }
          )
          console.log('updatePasswordRes: ', updatePasswordRes)
          // 3. Send response
          res.statusCode = 200
          res.json({ result: { reset: true } })
        }
      } else {
        // v not found
        res.statusCode = 500
        res.json({ error: 'Invalid password' })
      }
    } catch (e) {
      res.statusCode = 500
      console.log(JSON.stringify(e, null, 2))
      res.json({ error: JSON.stringify(e, null, 2) })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
