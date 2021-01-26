import Select from './Select'

interface IProps {
  value: string
  onChange: (v: string) => void
}

const SelectCountry = (props: IProps) => {
  const { value, onChange } = props
  return (
    <Select
      required
      value={value}
      onChange={onChange}
      label="Country"
      placeholder="Please select a country"
      options={[{ label: 'Canada', value: 'CA' }]}
    />
  )
}

export default SelectCountry
