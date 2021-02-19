import Divider from 'components/common/Divider'
import Checkbox from '@components/form/Checkbox'
import Input from '@components/form/Input'
import SelectCountry from '@components/form/SelectCountry'
import SelectProvince from '@components/form/SelectProvince'
import { IClientAccountForm } from 'types/customer.types'

interface IProps {
  form: IClientAccountForm
  setField: (field: string, value: string | boolean) => void
}
const AccountForm = (props: IProps) => {
  const { form, setField } = props
  return (
    <>
      {/* ========== Basic Info ========== */}
      <h2 className="text-2xl mb-4">
        <b>Basic Info</b>
      </h2>
      <div className="mb-4">
        <Input
          required
          value={form.companyName}
          onChange={(v) => setField('companyName', v)}
          label="Company Name"
          placeholder="JW Beaver Inc."
          helper="Legal business name"
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.contactFirstName}
          onChange={(v) => setField('contactFirstName', v)}
          label="First Name"
          placeholder="Jason"
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.contactLastName}
          onChange={(v) => setField('contactLastName', v)}
          label="Last Name"
          placeholder="Wang"
        />
      </div>
      <div className="mb-8">
        <Input
          value={form.mobile}
          onChange={(v) => setField('mobile', v)}
          label="Mobile"
          placeholder="1-647-1111-1111"
        />
      </div>
      <div className="mb-4">
        <Input
          required
          name="email"
          value={form.contactEmail}
          onChange={(v) => setField('contactEmail', v)}
          label="Contact / Login Email"
          placeholder="jason-allen@jwbeaver.com"
        />
      </div>
      <div className="mb-8">
        <Input
          required
          value={form.dba}
          onChange={(v) => setField('dba', v)}
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
          value={form.address1}
          onChange={(v) => setField('address1', v)}
          label="Address 1"
          placeholder="101 Kennedy Rd."
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.address2}
          onChange={(v) => setField('address2', v)}
          label="Address 2"
          placeholder="Unit 203"
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.city}
          onChange={(v) => setField('city', v)}
          label="City"
          placeholder="Toronto"
        />
      </div>
      <div className="mb-4">
        <SelectProvince
          value={form.province}
          onChange={(v) => setField('province', v)}
        />
      </div>
      <div className="mb-4">
        <SelectCountry
          value={form.country}
          onChange={(v) => setField('country', v)}
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.postal}
          onChange={(v) => setField('postal', v)}
          label="Postal Code"
          placeholder="L4R 3R8"
        />
      </div>
      <div className="mb-8">
        <Input
          required
          value={form.mobile}
          onChange={(v) => setField('mobile', v)}
          label="Mobile"
          placeholder="1-647-1111-1111"
        />
      </div>
      <div className="mb-4">
        <Input
          value={form.telephone}
          onChange={(v) => setField('telephone', v)}
          label="Telephone"
          placeholder="1-888-1111-1111"
        />
      </div>
      <div className="mb-4">
        <Input
          value={form.fax}
          onChange={(v) => setField('fax', v)}
          label="Fax"
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
          value={form.taxContactFirstName}
          onChange={(v) => setField('taxContactFirstName', v)}
          label="Tax Contact First Name"
          placeholder="Jason"
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.taxContactLastName}
          onChange={(v) => setField('setField', v)}
          label="Tax Contact Last Name"
          placeholder="Wang"
        />
      </div>
      <div className="mb-4">
        <Input
          required
          value={form.taxMobile}
          onChange={(v) => setField('taxMobile', v)}
          label="Mobile"
          placeholder="1-647-1111-1111"
        />
      </div>
      <div className="mb-4">
        <Input
          value={form.taxTelephone}
          onChange={(v) => setField('taxTelephone', v)}
          label="Telephone"
          placeholder="1-888-1111-1111"
        />
      </div>

      <div className="mb-4">
        <Checkbox
          checked={form.taxable}
          onChange={(v) => setField('taxable', v)}
          label="Taxable?"
        />
      </div>
      {!form.taxable && (
        <div className="mb-4">
          <Input
            required
            value={form.noneTaxableReason}
            onChange={(v) => setField('noneTaxableReason', v)}
            label="None Taxable Reason"
          />
        </div>
      )}
      <div className="mb-4">
        <Input
          required
          value={form.pst}
          onChange={(v) => setField('pst', v)}
          label="PST #"
        />
      </div>
      <div className="mb-8">
        <Input
          required
          value={form.hst}
          onChange={(v) => setField('hst', v)}
          label="HST/GST #"
        />
      </div>

      <Divider />

      {/* ========== Other ========== */}
      <h2 className="text-2xl mb-4">
        <b>Other Info</b>
      </h2>
      <div className="mb-4">
        <Input
          required
          value={form.referredFrom}
          onChange={(v) => setField('referredFrom', v)}
          label="How did you find us?"
          placeholder="Google search"
        />
      </div>
      <div className="mb-8">
        <Checkbox
          checked={form.subscribe}
          onChange={(v) => setField('subscribe', v)}
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
          value={form.password}
          onChange={(v) => setField('password', v)}
          label="Create Password"
          helper="Passwords must be longer than 7 chars and include numbers."
        />
      </div>
      <div className="mb-8">
        <Input
          required
          password
          value={form.confirmPassword || ''}
          onChange={(v) => setField('confirmPassword', v)}
          label="Confirm Password"
        />
      </div>
    </>
  )
}

export default AccountForm
