import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  variant?: 'default' | 'filled'
}

const Grid: FC<Props> = ({
  className,
  layout = 'A',
  children,
  variant = 'default',
}) => {
  return <div>{children}</div>
}

export default Grid
