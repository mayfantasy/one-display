import cn from 'classnames'
import Link from 'next/link'
import { FC, useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

import { Avatar } from '@components/common'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'
import ClickOutside from '@lib/click-outside'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

import useLogout from '@framework/use-logout'
import useCustomer from '@framework/use-customer'
import {
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingFilled,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import useCart from '@framework/cart/use-cart'
import { pageRoutes } from 'helpers/route.helpers'

interface DropdownMenuProps {
  open?: boolean
  navColor?: string
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false, navColor }) => {
  const logout = useLogout()
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()
  const [display, setDisplay] = useState(false)
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
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

  const { data: customerData } = useCustomer()

  const { data: cartData } = useCart()
  const itemsCount = Object.values(cartData?.line_items ?? {}).reduce(
    countItems,
    0
  )

  const $count = itemsCount > 0 && <span>{itemsCount}</span>

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div onClick={() => setDisplay(!display)}>
        <div
          // onClick={() => setDisplay(!display)}
          aria-label="Menu"
          className="flex flex-row items-center cursor-pointer"
        >
          {/* Avata */}
          {/* <Avatar className="mr-2" /> */}
          <span style={{ color: navColor }}>
            <ShoppingFilled className="text-2xl" />
            {$count}
          </span>

          {/* Name and email */}
          {/* <div>
            <div className="-mb-2">
              <small>
                <strong>
                  {customerData?.firstName} {customerData?.lastName}
                </strong>
              </small>
            </div>
            <div className="text-gray-500">
              <small>{customerData?.email}</small>
            </div>
          </div> */}
        </div>

        {/* Dropdown */}
        <div className="relative">
          {display && (
            <div className="absolute left-2/4 w-40 pt-1">
              <ul
                className="
                bg-white
                shadow-xl
                rounded
                p-4
                divide-y
                divide-gray-200
              "
                style={{ transform: 'translateX(-50%)' }}
              >
                {[
                  {
                    label: (
                      <>
                        <ShoppingOutlined className="mr-2" /> Cart {$count}
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
