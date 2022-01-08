import Button from '@components/common/Button'
import Subscribe from '@components/form/Subscribe'
import Layout from 'components/common/Layout'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout
      pageTitle="Home"
      pageDescription="Get our Low Price Guarantee, online or in store, on a huge selection of display and signage hardware, store supplies and more!"
      banner={{
        bg: { src: '/bg/home-1.png' },
        content: (
          // ----- Original content

          // <div className="container m-auto">
          //   <div className="w-full mt-56">
          //     <h1 className="text-white text-5xl text-center leading-tight mb-4">
          //       <span className="max-w-xl inline-block">
          //         Welcome To One Display
          //       </span>
          //     </h1>
          //     <p className="text-white text-center mb-8">
          //       <span className="max-w-xl inline-block text-sm">
          //         One Display Is A Canada Based <br />
          //         Leading Store Fixtures Pop-Up Displays And Signage Supplier.
          //       </span>
          //     </p>
          //     <div className="flex flex-row justify-center text-white">
          //       <Subscribe />
          //     </div>
          //   </div>
          // </div>

          <div className="container m-auto">
            <div className="w-full mt-56">
              <div className="flex flex-row justify-center align-bottom">
                <div className="w-6/12 xl:mr-36 xl:-ml-20">
                  <img className="w-full" src="/words/home-banner-text.png" />
                </div>
                <div className="flex flex-col justify-end relative">
                  <Link href={pageRoutes.priceMatchPolicyPage.url || ''}>
                    <Button primary>View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
      contentClasses="bg-gray-800"
    >
      <div className="flex flex-row justify-center text-white py-6 bg-gray-800">
        <Subscribe />
      </div>
    </Layout>
  )
}
