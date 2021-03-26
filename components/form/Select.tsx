interface IProps {
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
  label?: string
  width?: string | number
  helper?: string
  error?: string
  required?: boolean
  placeholder?: string
  name?: string
}

const Select = (props: IProps) => {
  const {
    value,
    options,
    onChange,
    label,
    width,
    helper,
    error,
    required,
    placeholder,
    name,
  } = props
  return (
    <div>
      {label && (
        <h5 className="mb-2 text-grey-700">
          {label}
          {required && <span className="ml-2 text-gray-500">(Required)</span>}
        </h5>
      )}
      <div>
        <select
          name={name}
          style={{
            width: width || '100%',
            borderRadius: 10,
            ...(error ? { borderColor: 'red' } : {}),
          }}
          className="border border-gray-400 h-12 p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option className="text-gray-300" value="">
            ----- {placeholder || 'Please Select'} -----
          </option>
          {options.map((o) => (
            <option key={o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {helper && !error && (
        <div>
          <small className="text-gray-600">{helper}</small>
        </div>
      )}
      {error && (
        <div>
          <small className="text-red-500">{error}</small>
        </div>
      )}
    </div>
  )
}

export default Select
