interface IProps {
  value: string
  onChange: (v: string) => void
  label?: string
  placeholder?: string
  width?: string | number
  helper?: string
  error?: string
  required?: boolean
  password?: boolean
  name?: string
}

const Input = (props: IProps) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    width,
    helper,
    error,
    required,
    password,
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
        <input
          name={name}
          type={password ? 'password' : 'text'}
          style={{
            width: width || '100%',
            ...(error ? { borderColor: 'red' } : {}),
          }}
          className="border border-gray-400 rounded h-8 p-2 placeholder-gray-300"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
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

export default Input
