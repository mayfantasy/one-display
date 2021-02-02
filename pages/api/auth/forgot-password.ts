import {
  decodeResettPasswordToken,
  generateResetPasswordToken,
} from 'helpers/auth.helpers'
import { pageRoutes } from 'helpers/route.helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { api as monfent } from 'requests/monfent'
import { IForgotPasswordPayload } from 'types/auth.types'
import { ICustomer } from 'types/customer.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email } = req.body as IForgotPasswordPayload

      const allCustomers = await api.get<ICustomer>(`/customers`)

      const customer = allCustomers.data.data.find((c) => c.email === email)
      console.log(customer)

      if (customer) {
        // Customer found
        // Send reset link with token
        // (Not doing _authentication.force_reset true)

        // 1. Generate token
        const token = generateResetPasswordToken({
          customer_id: customer.id,
          email,
        })
        const url = `${process.env.WEBSITE_BASE_URL}${pageRoutes.resetPasswordPage.url}?s=${token}`

        // 2. Send email with reset password link
        await monfent.post(`/email/send`, {
          meta: {
            collection_handle: 'propromo',
            schema_handle: 'email_template',
            id: '289449657430442502',
          },
          to_email: email,
          data: {
            url,
          },
        })

        // 3. Send response
        res.statusCode = 200
        res.json({ result: { url: 'generated' } })
      } else {
        // v not found
        res.statusCode = 500
        res.json({ error: 'Email not found' })
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
