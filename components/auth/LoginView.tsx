import { FC, useEffect, useState, useCallback } from 'react'
import useLogin from '@framework/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import Image from 'next/image'
import Divider from '@components/common/Divider'
import Input from '@components/form/Input'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import Button from '@components/common/Button'
import { validatePassword } from 'helpers/form.helpers'

interface Props {}

const LoginView: FC<Props> = () => {
  // Fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Submit status
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Form status
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  // Modal conotrol
  const { setModalView, closeModal } = useUI()

  const login = useLogin()

  const handleLogin = async () => {
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(
        !validate(email) || password.length < 7 || !validatePassword(password)
      )
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div>
      <div
        style={{ width: 400 }}
        className="p-4 max-w-xl m-auto overflow-scroll"
      >
        <h2 className="text-black text-2xl text-center mb-4">
          <b>Login</b>
        </h2>

        {message && <div className="py-1 text-red-500">{message}</div>}

        <Divider />

        <div className="mb-4">
          <Input
            required
            name="email"
            value={email}
            onChange={setEmail}
            label="Email"
          />
        </div>
        <div className="mb-8">
          <Input
            required
            name="password"
            password
            value={password}
            onChange={setPassword}
            label="Password"
          />
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="text-gray-700">
            <span>Not a member yet?</span> Please{' '}
            <a
              className="underline text-blue-800 cursor-pointer"
              onClick={() => setModalView('SIGNUP_VIEW')}
            >
              Sign Up
            </a>
          </div>
          <Button primary onClick={handleLogin} disabled={disabled}>
            {loading ? 'Logining...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  )

  // return (
  //   <form
  //     onSubmit={handleLogin}
  //     className="w-80 flex flex-col justify-between p-3"
  //   >
  //     <div className="flex justify-center pb-12 ">
  //       <Image width="64px" height="64px" src="/logo/logo.png" />
  //     </div>
  //     <div className="flex flex-col space-y-3">
  //       {message && (
  //         <div className="text-red border border-red p-3">
  //           {message}. Did you {` `}
  //           <a
  //             className="text-accent-9 inline font-bold hover:underline cursor-pointer"
  //             onClick={() => setModalView('FORGOT_VIEW')}
  //           >
  //             forgot your password?
  //           </a>
  //         </div>
  //       )}
  //       <Input type="email" placeholder="Email" onChange={setEmail} />
  //       <Input type="password" placeholder="Password" onChange={setPassword} />

  //       <Button
  //         variant="slim"
  //         type="submit"
  //         loading={loading}
  //         disabled={disabled}
  //       >
  //         Log In
  //       </Button>
  //       <div className="pt-1 text-center text-sm">
  //         <span className="text-accents-7">Don't have an account?</span>
  //         {` `}
  //         <a
  //           className="text-accent-9 font-bold hover:underline cursor-pointer"
  //           onClick={() => setModalView('SIGNUP_VIEW')}
  //         >
  //           Sign Up
  //         </a>
  //       </div>
  //     </div>
  //   </form>
  // )
}

export default LoginView
