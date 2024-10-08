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
          {required && <span className="mr-2 text-red-500">*</span>}
          {label}
        </h5>
      )}
      <div>
        <input
          name={name}
          type={password ? 'password' : 'text'}
          style={{
            width: width || '100%',
            borderRadius: 100,
            ...(error ? { borderColor: 'red' } : {}),
          }}
          className="border border-gray-400 h-8 py-2 px-4 placeholder-gray-300 outline-none"
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
