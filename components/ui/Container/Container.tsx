import cn from 'classnames'
import React, { FC } from 'react'

interface IProps {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<IProps> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(className, {
    'mx-auto container': !clean,
  })

  let Component: React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  > = el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
