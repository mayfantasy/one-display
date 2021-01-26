import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'
import Ticker from 'react-ticker'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'primary' | 'secondary'
}

const Maquee: FC<Props> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  return (
    <div>
      <Ticker offset={80}>{() => <div>{children}</div>}</Ticker>
    </div>
  )
}

export default Maquee
