import { FC, useEffect, useState, useCallback } from 'react'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import Divider from 'components/common/Divider'
import Input from '@components/form/Input'
import Button from 'components/common/Button'
import { forgotPasswordRequest } from 'requests/auth.request'

interface Props {}

const ForgotView: FC<Props> = () => {
  // Fields
  const [email, setEmail] = useState('')

  // Submit status
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  // Form status
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  // Modal conotrol
  const { setModalView, closeModal } = useUI()

  // const login = useLogin()

  const handleSubmit = async () => {
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await forgotPasswordRequest(email)
      setLoading(false)
      setSuccess(true)
    } catch ({ errors }) {
      setMessage(errors?.[0].message || 'Internal error')
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email))
    }
  }, [email, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div>
      <div
        style={{ width: 400 }}
        className="p-4 max-w-xl m-auto overflow-scroll hide-scrollbar"
      >
        <h2 className="text-black text-2xl text-center mb-4">
          {!success ? <b>Enter Email Address</b> : <b>Email Sent</b>}
        </h2>

        {message && !success && (
          <div className="py-1 text-red-500">{message}</div>
        )}

        <Divider />

        {!success ? (
          <>
            <div className="mb-4">
              <Input
                required
                name="email"
                value={email}
                onChange={setEmail}
                label="Email"
              />
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="text-gray-700">
                <div>
                  <a
                    className="underline text-blue-800 cursor-pointer"
                    onClick={() => setModalView('LOGIN_VIEW')}
                  >
                    Login
                  </a>
                </div>
              </div>
              <Button primary onClick={handleSubmit} disabled={disabled}>
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
              An reset password link has been sent to your email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotView
