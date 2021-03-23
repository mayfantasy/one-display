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
    <>
      <style jsx>
        {`
          .btn {
            adding: 6px 16px;
            font-size: 13px;
            line-height: 14px;
            color: #fff;
            border-radius: 100px;
            border: none;
            background: linear-gradient(
              78deg,
              rgba(243, 111, 70, 0.8) 0,
              #feaf61 100%
            );
            -moz-appearance: none;
            appearance: none;
            -webkit-appearance: none;
          }
        `}
      </style>
      <div
        onClick={onClick}
        className={`btn inline-block ${className || ''} ${
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
    </>
  )
}

export default Button
