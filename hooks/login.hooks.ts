import { useUI } from '@components/ui/context'
import useCustomer from '@framework/use-customer'
import { useState } from 'react'
import { loginRequest } from 'requests/auth.request'
import { ILoginCredentials } from 'types/auth.types'

export const useLogin = () => {
  const { revalidate } = useCustomer()
  const { closeModal } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = (credentials: ILoginCredentials) => {
    setLoading(true)

    loginRequest(credentials)
      .then((res) => {
        setError('')
        revalidate()
        closeModal()
      })
      .catch((errors) => {
        setError(errors?.[0]?.message || 'Internal error, please contact us.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { login, loading, error }
}
