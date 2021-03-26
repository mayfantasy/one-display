import { FC, useEffect, useState, useCallback } from 'react'
import { validate as validateEmail } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import useSignup from '@framework/use-signup'
import { validatePassword } from 'helpers/form.helpers'
import Divider from 'components/common/Divider'
import Input from '@components/form/Input'
import SelectProvince from '@components/form/SelectProvince'
import SelectCountry from '@components/form/SelectCountry'
import Checkbox from '@components/form/Checkbox'
import Button from 'components/common/Button'
import { signUpRequest } from 'requests/auth.request'
import { useAccountForm } from 'hooks/account-form.hooks'
import AccountForm from './AccountForm'

interface Props {}

const SignUpView: FC<Props> = () => {
  // form
  const {
    form,
    success,
    error,
    loading,
    setForm,
    setField,
    handleSubmit,
  } = useAccountForm()

  const { setModalView, closeModal } = useUI()

  return (
    <div>
      <div
        className="p-4 max-w-xl overflow-scroll hide-scrollbar"
        style={{ width: 400, height: 400, maxWidth: '95%' }}
      >
        <h2 className="text-black text-2xl text-center mb-4">
          <b>Sign Up</b>
        </h2>

        {error && !success && <div className="py-1 text-red-500">{error}</div>}

        <Divider />

        {success ? (
          <div>
            <h2 className="text-3xl flex flex-row items-center justify-center text-green-500">
              Success
            </h2>
            <p className="text-center text-gray-700">
              Your request has been submitted successfully. We are currently
              reviewing your business information and we will contact your
              shortly.
            </p>
            <div className="flex justify-center mt-4">
              <Button primary onClick={closeModal} className="w-16 text-center">
                OK
              </Button>
            </div>
          </div>
        ) : (
          <>
            <AccountForm form={form} setField={setField} />

            <div className="flex flex-row justify-between items-center">
              <div className="text-gray-700">
                <span>Already a member?</span> Please{' '}
                <a
                  className="underline text-blue-800 cursor-pointer"
                  onClick={() => setModalView('LOGIN_VIEW')}
                >
                  Login
                </a>
              </div>
              <Button primary onClick={handleSubmit}>
                Register
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SignUpView
