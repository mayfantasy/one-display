import { CaretDownOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { INavItem } from 'types/nav.types'

interface IProps {
  className?: string
  navItem: INavItem
  navColor?: string
}
const NavItem = (props: IProps) => {
  const { className, navItem, navColor } = props
  const $link = (
    <a
      className="flex flex-row items-center cursor-pointer"
      style={{ color: navColor }}
    >
      <span>{navItem.name}</span>
      {navItem.children && <CaretDownOutlined className="ml-2" />}
    </a>
  )
  return (
    <div className={`px-4 ${className || ''}`} onClick={navItem.onClick}>
      {navItem.url ? <Link href={navItem.url}>{$link}</Link> : $link}
    </div>
  )
}

export default NavItem
