import cn from 'classnames'

interface FeatureBarProps {
  className?: string
  title: string
  description?: string
  hide?: boolean
  action?: React.ReactNode
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {
  return (
    <div
      className={`
      transform
      ${hide ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
      bg-black text-white
      text-center p-6 text-sm flex-row justify-center items-center font-medium fixed bottom-0 w-full z-30 transition-all duration-300 ease-out
      md:flex md:text-left
      `}
    >
      <span className="block md:inline">{title}</span>
      <span className="block mb-6 md:inline md:mb-0 md:ml-2">
        {description}
      </span>
      {action && action}
    </div>
  )
}

export default FeatureBar
