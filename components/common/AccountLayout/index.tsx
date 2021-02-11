import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../Layout'

interface IProps {
  children: React.ReactNode
  pageTitle?: string
  pageDescription?: string
}

const AccountLayout = (props: IProps) => {
  const { children, pageTitle, pageDescription } = props
  const router = useRouter()

  return (
    <Layout pageTitle={pageTitle} pageDescription={pageDescription}>
      <div className="container m-auto flex flex-row py-32">
        <div className="w-40">
          <ul>
            {[pageRoutes.accountInfoPage, pageRoutes.accountOrdersPage].map(
              (n) => (
                <li
                  className={`cursor-pointer ${
                    router.asPath === n.url ? 'bg-gray-300 font-bold' : ''
                  }`}
                  key={n.key}
                >
                  <Link href={n.url!}>
                    <div className="h-full w-full px-8 py-2 ">
                      <a>{n.name}</a>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex-1 px-4 overflow-hidden">{children}</div>
      </div>
    </Layout>
  )
}

export default AccountLayout
