import { validatePassword } from 'helpers/form.helpers'
import { useCallback, useEffect, useState } from 'react'
import { validate as validateEmail } from 'email-validator'
import { getCustomerRequest, signUpRequest } from 'requests/auth.request'
import { IClientAccountForm } from 'types/customer.types'
import { customerRegistrationNotificationRequest } from 'requests/customer-registration-notifiication.request'

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
        customerRegistrationNotificationRequest({
          email: form.contactEmail,
          first_name: form.contactFirstName,
          last_name: form.contactLastName,
        })
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
    const finishedRequired =
      form.companyName &&
      form.dba &&
      form.contactFirstName &&
      form.contactLastName &&
      form.contactEmail &&
      form.address1 &&
      form.city &&
      form.postal &&
      form.province &&
      form.country &&
      form.referredFrom &&
      form.password &&
      form.confirmPassword &&
      form.password === form.confirmPassword
    setDisabled(
      !validateEmail(form.contactEmail) ||
        !validatePassword(form.password) ||
        !finishedRequired
    )
  }, [form])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return {
    form,
    handleSubmit,
    success,
    error,
    loading,
    setForm,
    setField,
    disabled,
  }
}
