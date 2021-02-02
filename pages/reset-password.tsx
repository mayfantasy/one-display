import { Layout } from '@components/common'
import Button from '@components/common/Button'
import Divider from '@components/common/Divider'
import Input from '@components/form/Input'
import { pageRoutes } from 'helpers/route.helpers'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { resetPasswordRequest } from 'requests/auth.request'

const ResetPasswordPage = () => {
  const router = useRouter()
  const signature = router.query.s as string

  // Fields
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Submit status
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  // Form status
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  // const login = useLogin()

  const handleSubmit = async () => {
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await resetPasswordRequest({ password, confirmPassword }, signature)
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        window.location.href = pageRoutes.homePage.url!
      }, 3000)
    } catch ({ errors }) {
      setMessage(errors?.[0].message || 'Internal error')
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(password !== confirmPassword || !signature)
    }
  }, [password, confirmPassword, signature, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])
  return (
    <Layout
      banner={{
        bg: { src: '/bg/home.png', mask: 'rgba(0,0,0,0.2)' },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-56">
              <div
                style={{ width: 400 }}
                className="p-4 max-w-xl m-auto overflow-scroll bg-white rounded shadow-lg"
              >
                <h2 className="text-black text-2xl text-center mb-4">
                  <b>Reset Password</b>
                </h2>

                {message && <div className="py-1 text-red-500">{message}</div>}

                <Divider />

                {!success ? (
                  <>
                    <div className="mb-4">
                      <Input
                        required
                        name="password"
                        value={password}
                        onChange={setPassword}
                        label="Password"
                        password
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        required
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        label="Confirm Password"
                        password
                      />
                    </div>

                    <div className="flex flex-row justify-between items-center">
                      <Button
                        primary
                        onClick={handleSubmit}
                        disabled={disabled || loading}
                      >
                        {loading ? 'Submitting...' : 'Submit'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div>
                    <h2 className="text-3xl flex flex-row items-center justify-center text-green-500">
                      Success
                    </h2>
                    <p className="text-center text-gray-700">
                      Password reset successfully, please login again.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    >
      123
    </Layout>
  )
}

export default ResetPasswordPage
