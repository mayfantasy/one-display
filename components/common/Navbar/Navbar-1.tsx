import { FC, useState, useEffect } from 'react'
import Link from 'next/link'

import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import Image from 'next/image'
import NavItem from './NavItem'
import { pageRoutes } from 'helpers/route.helpers'
import Button from '../Button'
import { SearchOutlined } from '@ant-design/icons'
import { useUI } from '@components/ui/context'
import { useNav } from 'hooks/nav.hooks'
import ProductMenu from '../ProductMenu'
import { NAV_HEIGHT } from 'helpers/constant.helpers'

interface IProps {
  navColor?: string
}
const Navbar = (props: IProps) => {
  const { navColor } = props
  const [hasScrolled, setHasScrolled] = useState(false)
  const { displaySearchbar, openSearchbar, displayProductMenu } = useUI()
  const navItems = useNav()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <Container>
        <div
          style={{ height: NAV_HEIGHT }}
          className="flex flex-row justify-between"
        >
          {/* Left Logo */}
          <div className="header__logo">
            <Link href={pageRoutes.homePage.url!}>
              <a>
                <Image src="/logo/logo.png" width="60" height="60" />
              </a>
            </Link>
          </div>

          {/* Nav Display */}
          {!displaySearchbar && (
            <nav className="flex flex-row items-center">
              {navItems.map((item) => (
                <NavItem navItem={item} key={item.key} navColor={navColor} />
              ))}
            </nav>
          )}

          {/* SearchBar display */}
          {displaySearchbar && (
            <div className="w-full flex flex-row items-center max-w-3xl">
              <Searchbar navColor={navColor} />
            </div>
          )}

          {/* Right section */}
          <div className="flex flex-row items-center">
            <SearchOutlined
              className="text-2xl mr-4 cursor-pointer"
              style={{ color: navColor }}
              onClick={() => openSearchbar()}
            />
            <UserNav navColor={navColor} />
            {/* <Link href={pageRoutes.loginPage.url!}>
              <a>
                <Button primary>Login</Button>
              </a>
            </Link> */}
          </div>

          {/* Product Menu */}
        </div>
      </Container>
      <ProductMenu />
    </div>
  )
}

export default Navbar
