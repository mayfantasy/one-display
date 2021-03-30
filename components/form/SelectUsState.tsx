import { usaStates } from 'helpers/province.helpers'
import Select from './Select'

interface IProps {
  value: string
  onChange: (v: string) => void
}

const SelectUsState = (props: IProps) => {
  const { value, onChange } = props
  return (
    <Select
      required
      value={value}
      onChange={onChange}
      label="Province"
      placeholder="Please select a state"
      options={usaStates.map((p: any) => ({
        label: p.label,
        value: p.label,
      }))}
    />
  )
}

export default SelectUsState
