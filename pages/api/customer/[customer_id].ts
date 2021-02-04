import { countryCodeMap } from 'helpers/country.helpers'
import { customerAttributeMap } from 'helpers/customer.helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import {
  IClientAccountForm,
  ICustomer,
  ICustomerAttribute,
} from 'types/customer.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const customer_id = req.query.customer_id as string

      // Get customer and related attributes
      const customerRes = await api.get<ICustomer>(
        `/customers?id:in=${customer_id}&include=addresses,attributes`
      )
      const customer = customerRes.data.data[0]
      const attributeMap = customer.attributes.reduce((a, c) => {
        a[c.attribute_id] = c.attribute_value
        return a
      }, {} as { [name: number]: string })

      // Combine them to a account form
      // Combine
      const customerData: IClientAccountForm = {
        // Basic
        companyName: customer.company,
        contactEmail: customer.email,
        contactFirstName: customer.first_name,
        contactLastName: customer.last_name,
        mobile: customer.phone,
        dba: attributeMap[customerAttributeMap.dba],
        // Company address
        address1: customer.addresses?.[0].address1,
        address2: customer.addresses?.[0].address2,
        city: customer.addresses?.[0].city,
        province: customer.addresses?.[0].state_or_province,
        postal: customer.addresses?.[0].postal_code,
        country: countryCodeMap[customer.addresses?.[0].country],
        telephone: customer.addresses?.[0].phone,
        fax: attributeMap[customerAttributeMap.fax],
        // Tax info
        taxContactFirstName:
          attributeMap[customerAttributeMap.taxContactFirstName],
        taxContactLastName:
          attributeMap[customerAttributeMap.taxContactLastName],
        taxTelephone: attributeMap[customerAttributeMap.taxTelephone],
        taxMobile: attributeMap[customerAttributeMap.taxMobile],
        taxable:
          attributeMap[customerAttributeMap.taxable] === 'TRUE' ? true : false,
        noneTaxableReason: attributeMap[customerAttributeMap.noneTaxableReason],
        pst: attributeMap[customerAttributeMap.pst],
        hst: attributeMap[customerAttributeMap.hst],
        // Other
        referredFrom: attributeMap[customerAttributeMap.referredFrom],
        subscribe:
          attributeMap[customerAttributeMap.subscribe] === 'TRUE'
            ? true
            : false,
        // Password
        password: attributeMap[customerAttributeMap.password],
      }

      res.statusCode = 200

      res.json({ result: { customer: customerData } })
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
