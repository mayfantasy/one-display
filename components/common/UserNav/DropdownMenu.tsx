import cn from 'classnames'
import Link from 'next/link'
import { FC, useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import ClickOutside from '@lib/click-outside'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

import useLogout from '@framework/use-logout'
import useCustomer, { Customer } from '@framework/use-customer'
import {
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingFilled,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { pageRoutes } from 'helpers/route.helpers'
import { ICart } from 'types/cart.types'
import { useCart } from 'hooks/cart.hooks'

interface DropdownMenuProps {
  customer: Customer
  open?: boolean
  navColor?: string
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  open = false,
  navColor,
  customer,
}) => {
  const logout = useLogout()
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()
  const [display, setDisplay] = useState(false)
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    cartItemsCount,
  } = useUI()
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  const { cart } = useCart()

  const $count = cartItemsCount > 0 && <span>{cartItemsCount}</span>

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div onClick={() => setDisplay(!display)}>
        <div
          style={{ color: navColor }}
          // onClick={() => setDisplay(!display)}
          aria-label="Menu"
          className="flex flex-row items-center cursor-pointer"
        >
          <span className="mr-2">
            <ShoppingFilled className="text-2xl" />
          </span>
          <span>{$count}</span>
        </div>

        {/* Dropdown */}
        <div className="relative">
          {display && (
            <div className="absolute right-0 w-52 pt-1">
              <ul
                className="
                bg-white
                shadow-xl
                rounded
                p-4
                divide-y
                divide-gray-200
              "
                // style={{ transform: 'translateX(-50%)' }}
              >
                {[
                  {
                    label: (
                      <div className="text-center w-full">
                        <h3 className="font-bold">
                          {customer.firstName} {customer.lastName}
                        </h3>
                        <div className="text-xs text-gray-400">
                          {customer.email}
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: (
                      <>
                        <ShoppingOutlined className="mr-2" />
                        <span className="mr-2">Cart</span>
                        <span>{$count}</span>
                      </>
                    ),
                    onClick: toggleSidebar,
                  },
                  {
                    label: (
                      <>
                        <TagOutlined className="mr-2" />
                        <Link href={pageRoutes.accountOrdersPage.url!}>
                          <a>Orders</a>
                        </Link>
                      </>
                    ),
                  },
                  {
                    label: (
                      <>
                        <UserOutlined className="mr-2" />
                        <Link href={pageRoutes.accountInfoPage.url!}>
                          <a>Account</a>
                        </Link>
                      </>
                    ),
                  },
                  {
                    label: (
                      <>
                        <LogoutOutlined className="mr-2" />
                        <a onClick={() => logout()}>Logout</a>
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <div
                      onClick={item.onClick}
                      className="p-2 text-sm text-center hover:text-blue-900 cursor-pointer flex flex-row items-center"
                    >
                      {item.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </ClickOutside>
  )
}

export default DropdownMenu
