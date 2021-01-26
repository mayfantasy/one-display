import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/use-customer'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import { Avatar } from '@components/common'
import Button from '../Button'

interface IProps {
  className?: string
  navColor?: string
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<IProps> = ({ className, children, navColor, ...props }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  return (
    <div className="flex flex-row items-center">
      <div className="mr-4">
        <span onClick={toggleSidebar} style={{ color: navColor }}>
          Cart
          {itemsCount > 0 && <span>{itemsCount}</span>}
        </span>
      </div>
      <div>
        {customer ? (
          <DropdownMenu />
        ) : (
          <Button primary aria-label="Menu" onClick={() => openModal()}>
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

export default UserNav
