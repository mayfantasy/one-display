import cn from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useUI } from '@components/ui/context'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { CartSidebarView } from '@components/cart'

import LoginView from '@components/auth/LoginView'
import { CommerceProvider } from '@framework'
import type { Page } from '@framework/api/operations/get-all-pages'
import { IBg } from 'types/ui.types'
import Banner from './Banner'
import Button from '../Button'
import ForgotView from '@components/auth/ForgotView'
import Head from 'next/head'
import Navbar from '../Navbar'
import Sidebar from '@components/ui/Sidebar'
import Modal from '@components/ui/Modal'

const SignUpView = dynamic(() => import('@components/auth/SignUpView'))
const FeatureBar = dynamic(() => import('components/common/FeatureBar'))

interface Props {
  children?: React.ReactNode
  pageTitle?: string
  pageDescription?: string
  header?: {
    navColor?: string
  }
  banner?: {
    bg: IBg
    content?: React.ReactNode
  }
  contentBgColor?: string
  contentClasses?: string
}

const Layout: FC<Props> = ({
  children,
  banner,
  header,
  pageTitle,
  pageDescription,
  contentBgColor,
  contentClasses,
}) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()

  const title = `${pageTitle} | One Display` || 'One Display'
  const description =
    pageDescription ||
    'Providing B2B services From Standard Sign Products to Customized Solutions'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content={description}></meta>
      </Head>
      <CommerceProvider locale={locale}>
        <Navbar navColor={header?.navColor} />
        <div style={{ zIndex: -1, marginTop: -60 }}>
          {banner && <Banner bg={banner.bg}>{banner.content}</Banner>}
          {children && (
            <main className={`px-2 md:px-0 ${contentClasses}`}>{children}</main>
          )}

          {/* <Footer pages={pageProps.pages} /> */}

          <Sidebar open={displaySidebar} onClose={closeSidebar}>
            <CartSidebarView />
          </Sidebar>

          <Modal open={displayModal} onClose={closeModal}>
            {modalView === 'LOGIN_VIEW' && <LoginView />}
            {modalView === 'SIGNUP_VIEW' && <SignUpView />}
            {modalView === 'FORGOT_VIEW' && <ForgotView />}
          </Modal>

          <FeatureBar
            title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
            hide={acceptedCookies}
            action={
              <Button
                primary
                className="mx-5"
                onClick={() => onAcceptCookies()}
              >
                Accept cookies
              </Button>
            }
          />
        </div>
      </CommerceProvider>
    </>
  )
}

export default Layout
