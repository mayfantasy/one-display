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
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'

interface IProps {
  className?: string
  navColor?: string
}

const UserNav: FC<IProps> = ({ className, children, navColor, ...props }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { openModal } = useUI()

  return (
    <div className="flex flex-row items-center">
      {/* <div className="mr-2">
        <span onClick={toggleSidebar} style={{ color: navColor }}>
          <ShoppingOutlined className="text-2xl text-gray-400" />
          {itemsCount > 0 && <span>{itemsCount}</span>}
        </span>
      </div> */}
      <div>
        {customer ? (
          <div className="z-50">
            <DropdownMenu navColor={navColor} />
          </div>
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
