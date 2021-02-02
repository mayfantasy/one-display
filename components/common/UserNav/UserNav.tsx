import { FC, useEffect } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/use-customer'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import { Avatar } from '@components/common'
import Button from '../Button'
import { useCookies } from 'react-cookie'
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { _3_YEARS_COOKIE_DURATION } from 'helpers/constant.helpers'
import { ICart } from 'types/cart.types'

interface IProps {
  className?: string
  navColor?: string
}

const UserNav: FC<IProps> = ({ className, children, navColor, ...props }) => {
  const { data: customer } = useCustomer()

  // Set customer_id to cookie
  const [cookie, setCookie] = useCookies(['customer_id'])
  useEffect(() => {
    setCookie('customer_id', customer?.entityId, {
      path: '/',
      maxAge: _3_YEARS_COOKIE_DURATION, // Expires after 3 years
      sameSite: true,
    })
  }, [customer])

  // Login modal
  const { openModal } = useUI()

  return (
    <div className="flex flex-row items-center z-30">
      <div>
        {customer ? (
          <div>
            <DropdownMenu customer={customer} navColor={navColor} />
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
