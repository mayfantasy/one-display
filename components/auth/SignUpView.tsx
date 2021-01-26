import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import useSignup from '@framework/use-signup'
import { validatePassword } from 'helpers/form.helpers'
import Divider from '@components/common/Divider'
import Input from '@components/form/Input'
import SelectProvince from '@components/form/SelectProvince'
import SelectCountry from '@components/form/SelectCountry'
import Checkbox from '@components/form/Checkbox'
import Button from '@components/common/Button'

interface Props {}

const SignUpView: FC<Props> = () => {
  // Baisc Info
  const [companyName, setCompanyName] = useState('')
  const [dba, setDba] = useState('')

  // Company Address
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postal, setPostal] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [fax, setFax] = useState('')
  const [mobile, setMobile] = useState('')

  // Tax Info
  const [taxContactName, setTaxContactName] = useState('')
  const [taxTelephone, setTaxTelephone] = useState('')
  const [taxMobile, setTaxMobile] = useState('')
  const [taxable, setTaxable] = useState(true)
  const [pst, setPst] = useState('')
  const [hst, setHst] = useState('')

  // Other
  const [referredFrom, setReferredFrom] = useState('')
  const [subscribe, setSubscribe] = useState(true)

  // Login
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Submit status
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Form Status
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const handleSignup = async () => {
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      // await signup({
      //   email,
      //   firstName,
      //   lastName,
      //   password,
      // })
      console.log('yes')
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(contactEmail) || !validatePassword(password))
    }
  }, [contactEmail, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div>
      <div
        className="p-4 max-w-xl overflow-scroll"
        style={{ width: 400, height: 400 }}
      >
        <h2 className="text-black text-2xl text-center mb-4">
          <b>Sign Up</b>
        </h2>

        <Divider />

        {/* ========== Basic Info ========== */}
        <h2 className="text-2xl mb-4">
          <b>Basic Info</b>
        </h2>
        <div className="mb-4">
          <Input
            required
            value={companyName}
            onChange={setCompanyName}
            label="Company Name"
            placeholder="JW Beaver Inc."
            helper="Legal business name"
          />
        </div>
        <div className="mb-8">
          <Input
            required
            value={dba}
            onChange={setDba}
            label="Doing Business As (DBA Name)"
            placeholder="Owner"
          />
        </div>

        <Divider />

        {/* ========== Company Address ========== */}
        <h2 className="text-2xl mb-4">
          <b>Company Address</b>
        </h2>
        <div className="mb-4">
          <Input
            required
            value={contactName}
            onChange={setContactName}
            label="Contact Name"
            placeholder="Jason Allen"
          />
        </div>
        <div className="mb-4">
          <Input
            required
            name="email"
            value={contactEmail}
            onChange={setContactEmail}
            label="Contact / Login Email"
            placeholder="jason-allen@jwbeaver.com"
          />
        </div>
        <div className="mb-4">
          <Input
            required
            value={address1}
            onChange={setAddress1}
            label="Address 1"
            placeholder="101 Kennedy Rd."
          />
        </div>
        <div className="mb-4">
          <Input
            required
            value={address2}
            onChange={setAddress2}
            label="Address 2"
            placeholder="Unit 203"
          />
        </div>
        <div className="mb-4">
          <Input
            required
            value={city}
            onChange={setCity}
            label="City"
            placeholder="Toronto"
          />
        </div>
        <div className="mb-4">
          <SelectProvince value={province} onChange={setProvince} />
        </div>
        <div className="mb-4">
          <SelectCountry value={country} onChange={setCountry} />
        </div>
        <div className="mb-4">
          <Input
            required
            value={postal}
            onChange={setPostal}
            label="Postal Code"
            placeholder="L4R 3R8"
          />
        </div>
        <div className="mb-4">
          <Input
            value={phone}
            onChange={setPhone}
            label="Telephone"
            placeholder="1-888-1111-1111"
          />
        </div>
        <div className="mb-4">
          <Input value={fax} onChange={setFax} label="Fax" />
        </div>
        <div className="mb-8">
          <Input
            value={mobile}
            onChange={setMobile}
            label="Mobile"
            placeholder="1-647-1111-1111"
          />
        </div>

        <Divider />

        {/* ========== Tax Information ========== */}
        <h2 className="text-2xl mb-4">
          <b>Tax Info</b>
        </h2>
        <div className="mb-4">
          <Input
            required
            value={taxContactName}
            onChange={setTaxContactName}
            label="Contact Name"
            placeholder="Jason Allen"
          />
        </div>
        <div className="mb-4">
          <Input
            required
            value={taxTelephone}
            onChange={setTaxTelephone}
            label="Telephone"
            placeholder="1-888-1111-1111"
          />
        </div>
        <div className="mb-4">
          <Input
            required
            value={taxMobile}
            onChange={setTaxMobile}
            label="Mobile"
            placeholder="1-647-1111-1111"
          />
        </div>
        <div className="mb-4">
          <Checkbox checked={taxable} onChange={setTaxable} label="Taxable?" />
        </div>
        <div className="mb-4">
          <Input required value={pst} onChange={setPst} label="PST #" />
        </div>
        <div className="mb-8">
          <Input required value={hst} onChange={setHst} label="HST/GST #" />
        </div>

        <Divider />

        {/* ========== Other ========== */}
        <h2 className="text-2xl mb-4">
          <b>Other Info</b>
        </h2>
        <div className="mb-4">
          <Input
            required
            value={referredFrom}
            onChange={setReferredFrom}
            label="How did you find us?"
            placeholder="Google search"
          />
        </div>
        <div className="mb-8">
          <Checkbox
            checked={subscribe}
            onChange={setSubscribe}
            label="Subscribe for exclusive offers"
          />
        </div>

        {/* ========== Set Password ========== */}
        <h2 className="text-2xl mb-4">
          <b>Set Password</b>
        </h2>
        <div className="mb-4">
          <Input
            required
            password
            value={password}
            onChange={setPassword}
            label="Create Password"
            helper="Passwords must be longer than 7 chars and include numbers."
          />
        </div>
        <div className="mb-8">
          <Input
            required
            password
            value={confirmPassword}
            onChange={setConfirmPassword}
            label="Confirm Password"
          />
        </div>

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
          <Button primary onClick={handleSignup}>
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUpView
