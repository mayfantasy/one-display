interface IProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  placeholder?: string
  helper?: string
  error?: string
}

const Checkbox = (props: IProps) => {
  const { checked, onChange, label, placeholder, helper, error } = props
  return (
    <div>
      {label && <h5 className="mb-2 text-grey-700">{label}</h5>}
      <div>
        <input
          type="checkbox"
          style={{
            width: 20,
            ...(error ? { borderColor: 'red' } : {}),
          }}
          className="rounded h-8 p-2 placeholder-gray-300"
          placeholder={placeholder}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
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

export default Checkbox
