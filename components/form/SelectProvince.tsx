import { canadianProvinces } from 'helpers/province.helpers'
import Select from './Select'

interface IProps {
  value: string
  onChange: (v: string) => void
}

const SelectProvince = (props: IProps) => {
  const { value, onChange } = props
  return (
    <Select
      required
      value={value}
      onChange={onChange}
      label="Province"
      placeholder="Please select a province"
      options={canadianProvinces.map((p) => ({
        label: p.label,
        value: p.label,
      }))}
    />
  )
}

export default SelectProvince
