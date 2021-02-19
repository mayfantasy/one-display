import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

interface IProps {
  type: 'success' | 'error'
  message: string
  className?: string
}
const Message = (props: IProps) => {
  const { type, message, className } = props

  if (type === 'success') {
    return (
      <div
        className={`flex items-center py-1 px-3 bg-white rounded text-green-500 ${className}`}
      >
        <CheckCircleFilled className="mr-2" /> {message}
      </div>
    )
  }

  if (type === 'error') {
    return (
      <div
        className={`flex items-center py-1 px-3 bg-white rounded text-red-500 ${className}`}
      >
        <CloseCircleFilled className="mr-2" /> {message}
      </div>
    )
  }
  return (
    <div className={`flex items-center py-2 px-3 bg-white rounded`}>
      {message}
    </div>
  )
}

export default Message
