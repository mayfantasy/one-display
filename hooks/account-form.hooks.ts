import { useEffect, useState } from 'react'
import { IClientAccountForm } from 'types/customer.types'

export const useAccountForm = (init?: IClientAccountForm) => {
  const [form, setForm] = useState<IClientAccountForm>({
    // Basic info
    companyName: '',
    contactEmail: '',
    contactFirstName: '',
    contactLastName: '',
    mobile: '',
    dba: '',
    // Company Address
    address1: '',
    address2: '',
    city: '',
    province: '',
    postal: '',
    country: '',
    telephone: '',
    fax: '',
    // Tax Info
    taxContactFirstName: '',
    taxContactLastName: '',
    taxTelephone: '',
    taxMobile: '',
    taxable: true,
    noneTaxableReason: '',
    pst: '',
    hst: '',
    // Other
    referredFrom: '',
    subscribe: true,
    // Security
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (init) {
      setForm(init)
    }
  }, [init])

  const setField = (field: string, value: string | boolean) => {
    const newForm = {
      ...form,
      [field]: value,
    }
    setForm(newForm)
  }

  return { form, setForm, setField }
}
