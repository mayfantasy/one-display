import AccountLayout from 'components/common/AccountLayout'
import { useCallback, useEffect, useState } from 'react'
import { validate as validateEmail } from 'email-validator'
import { validatePassword } from 'helpers/form.helpers'
import Input from '@components/form/Input'
import Checkbox from '@components/form/Checkbox'
import Divider from 'components/common/Divider'
import SelectProvince from '@components/form/SelectProvince'
import SelectCountry from '@components/form/SelectCountry'
import Button from 'components/common/Button'
import { useAccountForm } from 'hooks/account-form.hooks'
import { getCustomerRequest } from 'requests/auth.request'
import { useCookies } from 'react-cookie'
import { useUI } from '@components/ui/context'
import { useCustomerId } from 'hooks/customer.hooks'
import AccountForm from '@components/auth/AccountForm'

const AccountInfoPage = () => {
  const { openModal } = useUI()
  // customer id
  const customerId = useCustomerId()

  // form
  const { form, success, error, loading, setForm, setField } = useAccountForm(
    customerId
  )

  // Render
  return (
    <AccountLayout pageTitle="My Account">
      {!customerId && (
        <div className="text-center">
          Please{' '}
          <a
            onClick={openModal}
            className="underline text-blue-700 cursor-pointer"
          >
            Login
          </a>{' '}
          to see your account detail
        </div>
      )}
      {customerId && (
        <div>
          <div className="max-w-xl overflow-scroll" style={{ width: 400 }}>
            {/* <h2 className="text-black  text-2xl text-center mb-4">
            <b>Update Account Info</b>
          </h2> */}

            {error && !success && (
              <div className="py-1 text-red-500">{error}</div>
            )}

            {success && (
              <div className="py-1 text-green-500">
                Account updated successfully
              </div>
            )}

            {/* <Divider /> */}
            <AccountForm form={form} setField={setField} />
          </div>
          <Button primary>Save</Button>
        </div>
      )}
    </AccountLayout>
  )
}

export default AccountInfoPage
