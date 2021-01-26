interface IProps {
  height?: number
  margin?: number
}

const Divider = (props: IProps) => {
  const { height, margin } = props
  return (
    <div
      style={{
        height: height || '1px',
        marginTop: margin || '15px',
        marginBottom: margin || '15px',
      }}
      className="bg-gray-300"
    />
  )
}

export default Divider
