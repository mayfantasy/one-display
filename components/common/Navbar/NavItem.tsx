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
  return (
    <div className={`p-3 ${className}`}>
      <Link href={navItem.url!}>
        <a className="flex flex-row items-center" style={{ color: navColor }}>
          <span>{navItem.name}</span>
          {navItem.children && <CaretDownOutlined className="ml-2" />}
        </a>
      </Link>
    </div>
  )
}

export default NavItem
