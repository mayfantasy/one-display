import { customerAttributeMap } from 'helpers/customer.helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'requests/server'
import { IAddCartItemsPayload, ILineItem } from 'types/cart.types'
import {
  IAddressPayload,
  IClientAccountForm,
  ICreateCustomerPayload,
  ICustomer,
  ICustomerAttributePayload,
  IUpsertCustomerAttributeValuesPayloadItem,
} from 'types/customer.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const p = req.body as IClientAccountForm
      const payload: ICreateCustomerPayload = {
        email: p.contactEmail,
        first_name: p.contactFirstName,
        last_name: p.contactLastName,
        company: p.companyName,
        phone: p.mobile,
        addresses: [
          {
            first_name: p.contactFirstName,
            last_name: p.contactLastName,
            company: p.companyName,
            address1: p.address1,
            address2: p.address2,
            city: p.city,
            state_or_province: p.province,
            postal_code: p.postal,
            country_code: p.country,
            phone: p.mobile,
            address_type: 'commercial',
          },
        ] as IAddressPayload[],
      }

      // 1. Create customer
      const createCustomerRes = await api.post<ICustomer>(`/customers`, [
        payload,
      ])
      const customer = createCustomerRes.data.data.find(
        (c) => c.email === p.contactEmail
      )

      // 2. Create customer attributes
      const attributes = [
        {
          attribute_id: customerAttributeMap.dba, //"Doing Business As",
          value: p.dba,
        },
        {
          attribute_id: customerAttributeMap.telephone, //"Tel #",
          value: p.telephone,
        },
        {
          attribute_id: customerAttributeMap.fax, //"Fax",
          value: p.fax,
        },
        {
          attribute_id: customerAttributeMap.mobile, //"Mobile #",
          value: p.mobile,
        },
        {
          attribute_id: customerAttributeMap.taxContactFirstName, //"First Name [Tax]",
          value: p.taxContactFirstName,
        },
        {
          attribute_id: customerAttributeMap.taxContactLastName, //"Last Name [Tax]",
          value: p.taxContactLastName,
        },
        {
          attribute_id: customerAttributeMap.taxTelephone, //"Tel # [Tax]",
          value: p.taxTelephone,
        },
        {
          attribute_id: customerAttributeMap.taxMobile, //"Mobile # [Tax]",
          value: p.taxMobile,
        },
        {
          attribute_id: customerAttributeMap.taxable, //"Taxable",
          value: p.taxable ? 'TRUE' : 'FALSE',
        },
        {
          attribute_id: customerAttributeMap.noneTaxableReason, //"None Taxable Reason",
          value: p.noneTaxableReason,
        },
        {
          attribute_id: customerAttributeMap.pst, //"PST #",
          value: p.pst,
        },
        {
          attribute_id: customerAttributeMap.hst, //"HST/GST #",
          value: p.hst,
        },
        {
          attribute_id: customerAttributeMap.referredFrom, //"Referred From",
          value: p.referredFrom,
        },
        {
          attribute_id: customerAttributeMap.subscribe, // Subscribe to Newsletter
          value: p.subscribe ? 'TRUE' : 'FALSE',
        },
        {
          attribute_id: customerAttributeMap.password, // Password
          value: p.password,
        },
        {
          attribute_id: 17, // Under Screening
          value: 'TRUE',
        },
      ].map((a) => ({
        ...a,
        customer_id: customer?.id,
      })) as IUpsertCustomerAttributeValuesPayloadItem[]

      const upsertCustomerAttributesRes = await api.put<ICustomer>(
        `/customers/attribute-values`,
        attributes
      )

      res.statusCode = 200
      res.json({ result: { customer } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
