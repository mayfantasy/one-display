interface IProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  inline?: boolean
  placeholder?: string
  helper?: string
  error?: string
}

const Checkbox = (props: IProps) => {
  const { checked, inline, onChange, label, placeholder, helper, error } = props
  return (
    <div>
      {label && !inline && <h5 className="mb-2 text-grey-700">{label}</h5>}
      <div className={`${inline ? 'flex items-center' : ''}`}>
        <input
          type="checkbox"
          style={{
            width: 20,
            ...(error ? { borderColor: 'red' } : {}),
          }}
          className="rounded h-8 p-2 placeholder-gray-300 outline-none"
          placeholder={placeholder}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label && inline && (
          <h5 className="ml-2 text-grey-700 inline-block">{label}</h5>
        )}
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
