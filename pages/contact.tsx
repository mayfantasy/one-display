import { Layout } from '@components/common'
import Subscribe from '@components/form/Subscribe'

const ContactPage = () => {
  return (
    <Layout
      banner={{
        bg: {
          src: '/bg/contact.png',
          mask: 'rgba(0,0,0,0.4)',
        },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-16 flex flex-row">
              <div className="mr-3" style={{ width: 300 }}>
                <div className="bg-white bg-opacity-50 w-full mb-3 p-3 rounded">
                  <h2 className="font-bold text-xl mb-4">
                    Toronto Head Office
                  </h2>
                  <p className="mb-4">
                    07 Ferrier Street
                    <br />
                    Markham, ON
                    <br /> Canada, L3R3K6
                  </p>

                  <p>
                    Toll Free: <b>(983)-371-3850</b>
                    <br />
                    Tel: <b>(362)-396-8839</b>
                    <br /> Email:{' '}
                    <a className="font-bold" href="mailto:info@jwbeaver.com">
                      info@jwbeaver.com
                    </a>
                  </p>
                </div>
                <div className="bg-white bg-opacity-50 w-full rounded p-3">
                  <Subscribe />
                </div>
              </div>
              <div
                className="bg-white bg-opacity-50 rounded p-3"
                style={{ width: 300 }}
              >
                <h2 className="font-bold text-xl mb-4">Office Hours</h2>
                <p className="mb-4">
                  Monday to Friday
                  <br />
                  <b>9:30 AM - 6:00 PM EST</b>
                  <br />
                  <b>6:30 AM - 3:00 PM PST</b>
                </p>
                <p className="mb-4">
                  Saturday
                  <br />
                  <b>9:30 AM - 6:00 PM EST</b>
                </p>
                <p>
                  Sunday
                  <br />
                  <b>Closed</b>
                </p>
              </div>
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    />
  )
}

export default ContactPage
