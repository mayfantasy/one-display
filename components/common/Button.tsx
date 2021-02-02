import cn from 'classnames'

interface IProps {
  children: React.ReactNode
  primary?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button = (props: IProps) => {
  const { children, primary, onClick, disabled, className } = props
  return (
    <div
      onClick={onClick}
      className={`${className || ''} ${
        primary ? 'bg-blue-900 hover:bg-blue-800' : ''
      } px-4 py-2 text-white rounded cursor-pointer`}
      style={{
        ...(disabled
          ? {
              backgroundColor: '#999',
              cursor: 'not-allowed',
            }
          : {}),
      }}
    >
      {children}
    </div>
  )
}

export default Button
