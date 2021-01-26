import { FC, useState, useEffect } from 'react'
import Link from 'next/link'

import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import Image from 'next/image'
import { navItems } from 'helpers/nav.helpers'
import NavItem from './NavItem'
import { pageRoutes } from 'helpers/route.helpers'
import Button from '../Button'

interface IProps {
  navColor?: string
}
const Navbar = (props: IProps) => {
  const { navColor } = props
  const [hasScrolled, setHasScrolled] = useState(false)

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
        <div className="flex flex-row justify-between">
          <div className="header__logo">
            <Image src="/logo/logo.png" width="60" height="60" />
          </div>
          <nav className="flex flex-row items-center">
            {navItems.map((item) => (
              <NavItem navItem={item} key={item.key} navColor={navColor} />
            ))}
          </nav>
          <div className="flex flex-row items-center">
            <Link href={pageRoutes.loginPage.url!}>
              <a>
                <Button primary>Login</Button>
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
