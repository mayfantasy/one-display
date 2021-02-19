import { validatePassword } from 'helpers/form.helpers'
import { useCallback, useEffect, useState } from 'react'
import { validate as validateEmail } from 'email-validator'
import { getCustomerRequest, signUpRequest } from 'requests/auth.request'
import { IClientAccountForm } from 'types/customer.types'

export const useAccountForm = (customerId?: number) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form Status
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (customerId) {
      setLoading(true)
      getCustomerRequest(customerId)
        .then((res) => {
          setForm(res.data.result.customer)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [customerId])

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

  const setField = (field: string, value: string | boolean) => {
    const newForm = {
      ...form,
      [field]: value,
    }
    setForm(newForm)
  }

  // Handle submit
  const handleSubmit = async () => {
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setError('')
      if (customerId) {
        console.log('Update form')
      } else {
        await signUpRequest(form)
      }
      setSuccess(true)
      setLoading(false)
    } catch ({ errors }) {
      setError(errors?.[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(
        !validateEmail(form.contactEmail) || !validatePassword(form.password)
      )
    }
  }, [form.contactEmail, form.password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return { form, handleSubmit, success, error, loading, setForm, setField }
}
