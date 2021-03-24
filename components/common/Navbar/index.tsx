import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from 'components/libs/react-sticky-nav'
import throttle from 'lodash.throttle'
import Image from 'next/image'
import NavItem from './NavItem'
import { pageRoutes } from 'helpers/route.helpers'
import { SearchOutlined } from '@ant-design/icons'
import { useUI } from '@components/ui/context'
import { useNav } from 'hooks/nav.hooks'
import ProductMenu from '../ProductMenu'
import { MOB_NAV_HEIGHT, NAV_HEIGHT } from 'helpers/constant.helpers'
import Searchbar from '../Searchbar'
import Container from '@components/ui/Container'
import UserNav from '../UserNav/UserNav'
import { useRouter } from 'next/router'
import { useSearchBar } from 'hooks/search.hooks'

interface IProps {
  navColor?: string
}
const Navbar = (props: IProps) => {
  const { navColor } = props
  const [hasScrolled, setHasScrolled] = useState(false)
  const {
    displaySearchbar,
    openSearchbar,
    displayProductMenu,
    closeProductMenu,
  } = useUI()

  const navItems = useNav()

  const searchbarProps = useSearchBar()

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
    <Navigation>
      {(position) => {
        const isSticked = position !== 'sticky-unfixed'
        return (
          <>
            {/* ==================================== */}
            {/* Mobile */}
            <div
              className="z-90 top-0 w-full md:hidden md:px-0"
              onClick={() => {
                if (displayProductMenu) {
                  closeProductMenu()
                }
              }}
              style={{
                backgroundColor: isSticked ? 'white' : 'transparent',
              }}
            >
              <div style={{ height: NAV_HEIGHT }} className="">
                {/* Logo */}
                <div className="flex justify-between">
                  <div className="header__logo text-center">
                    <Link href={pageRoutes.homePage.url!}>
                      <a className="inline-block">
                        <img
                          src="/logo/logo.png"
                          style={{ height: 50, width: 50 }}
                        />
                      </a>
                    </Link>
                  </div>

                  {/* Right section */}
                  <div
                    className="text-center flex items-center p-2"
                    style={{ height: 60 }}
                  >
                    {!displaySearchbar && (
                      <div className="inline-block">
                        <SearchOutlined
                          className="text-2xl mr-4 cursor-pointer"
                          style={{ color: isSticked ? 'black' : navColor }}
                          onClick={() => openSearchbar()}
                        />
                      </div>
                    )}
                    <div className="inline-block">
                      <UserNav navColor={isSticked ? 'black' : navColor} />
                    </div>
                  </div>
                </div>

                {/* Nav Display */}
                {!displaySearchbar && (
                  <nav
                    className=""
                    style={{
                      backgroundColor: isSticked ? 'white' : 'transparent',
                      height: NAV_HEIGHT,
                      boxShadow: isSticked
                        ? '0 5px 5px 0 rgb(154 161 174 / 50%)'
                        : 'none',
                    }}
                  >
                    {navItems.map((item) => (
                      <div
                        className="inline-block w-1/4 h-6"
                        style={{ fontSize: '0.5rem' }}
                      >
                        <NavItem
                          navItem={item}
                          key={item.key}
                          navColor={isSticked ? 'black' : navColor}
                        />
                      </div>
                    ))}
                  </nav>
                )}

                {/* SearchBar display */}
                {displaySearchbar && (
                  <div className="w-full flex flex-row items-center max-w-2xl md:max-w-3xl">
                    <Searchbar
                      navColor={isSticked ? 'black' : navColor}
                      {...searchbarProps}
                    />
                  </div>
                )}

                {/* Product Menu */}
              </div>

              <ProductMenu />
            </div>

            {/* ==================================== */}
            {/* Desktop */}
            <div
              className="z-90 top-0 w-full hidden md:block"
              onClick={() => {
                if (displayProductMenu) {
                  closeProductMenu()
                }
              }}
              style={{
                backgroundColor: isSticked ? 'white' : 'transparent',
                boxShadow: isSticked
                  ? '0 2px 5px 0 rgb(154 161 174 / 50%)'
                  : 'none',
              }}
            >
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
                        <NavItem
                          navItem={item}
                          key={item.key}
                          navColor={isSticked ? 'black' : navColor}
                        />
                      ))}
                    </nav>
                  )}

                  {/* SearchBar display */}
                  {displaySearchbar && (
                    <div className="w-full flex flex-row items-center max-w-2xl md:max-w-3xl">
                      <Searchbar
                        navColor={isSticked ? 'black' : navColor}
                        {...searchbarProps}
                      />
                    </div>
                  )}

                  {/* Right section */}
                  <div className="flex flex-row items-center">
                    {!displaySearchbar && (
                      <SearchOutlined
                        className="text-2xl mr-4 cursor-pointer"
                        style={{ color: isSticked ? 'black' : navColor }}
                        onClick={() => openSearchbar()}
                      />
                    )}
                    <UserNav navColor={isSticked ? 'black' : navColor} />
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
          </>
        )
      }}
    </Navigation>
  )
}

export default Navbar
