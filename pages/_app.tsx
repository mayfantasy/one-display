import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'
import '@assets/chrome-bug.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ManagedUIContext } from '@components/ui/context'
import { CookiesProvider } from 'react-cookie'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    if (window && window.location.pathname !== '/') {
      window.location.href = '/'
    }
  }, [])

  // return (
  //   <>
  //     <CookiesProvider>
  //       <ManagedUIContext>
  //         <Layout pageProps={pageProps}>
  //           <Component {...pageProps} />
  //         </Layout>
  //       </ManagedUIContext>
  //     </CookiesProvider>
  //   </>
  // )

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '100px auto',
        }}
      >
        <div>
          <h1 style={{ fontSize: 30 }}>Coming Soon...</h1>
          <p style={{ fontSize: 15 }}>
            <strong>Our website is currently under construction.</strong>
          </p>
          <p style={{ fontSize: 15 }}>
            <strong>
              Please contact{' '}
              <a
                href="mailto:wholesale@jwbeaver.com"
                style={{ textDecoration: 'underline', color: 'blue' }}
              >
                wholesale@jwbeaver.com
              </a>{' '}
              if you have any questions.
            </strong>
          </p>
        </div>
      </div>
    </div>
  )
}
