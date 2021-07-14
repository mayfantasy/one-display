import Subscribe from '@components/form/Subscribe'
import Layout from 'components/common/Layout'

export default function Home() {
  return (
    <Layout
      pageTitle="Home"
      banner={{
        bg: { src: '/bg/home.png', mask: 'rgba(0,0,0,0.2)' },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-56">
              <h1 className="text-white text-5xl text-center leading-tight mb-4">
                <span className="max-w-xl inline-block">
                  Welcome To JW Beaver Inc
                </span>
              </h1>
              <p className="text-white text-center mb-8">
                <span className="max-w-xl inline-block text-sm">
                  JW Beaver Inc Is A Canada Based <br />
                  Leading Store Fixtures Pop-Up Displays And Signage Supplier.
                </span>
              </p>
              <div className="flex flex-row justify-center text-white">
                <Subscribe />
              </div>
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    />
  )
}
