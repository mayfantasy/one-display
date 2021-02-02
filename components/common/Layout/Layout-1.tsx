import cn from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Modal, LoadingDots } from '@components/ui'
import { CartSidebarView } from '@components/cart'

import LoginView from '@components/auth/LoginView'
import { CommerceProvider } from '@framework'
import type { Page } from '@framework/api/operations/get-all-pages'
import { IBg } from 'types/ui.types'
import Banner from './Banner'
import Button from '../Button'
import ForgotView from '@components/auth/ForgotView'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)
const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)
const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

interface Props {
  children?: React.ReactNode
  header?: {
    navColor?: string
  }
  banner?: {
    bg: IBg
    content?: React.ReactNode
  }
}

const Layout: FC<Props> = ({ children, banner, header }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()

  return (
    <CommerceProvider locale={locale}>
      <Navbar navColor={header?.navColor} />
      <div style={{ zIndex: -1, marginTop: -60 }}>
        {banner && <Banner bg={banner.bg}>{banner.content}</Banner>}
        {children && <main>{children}</main>}

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
            <Button primary className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
