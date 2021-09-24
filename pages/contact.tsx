import Layout from 'components/common/Layout'
import Subscribe from '@components/form/Subscribe'
import { useContactUsContent } from 'hooks/content.hooks'
import Skeleton from 'react-loading-skeleton'

const ContactPage = () => {
  const { loading, content } = useContactUsContent()
  return (
    <Layout
      pageTitle="Contact"
      banner={{
        bg: {
          src: '/bg/contact.png',
          mask: 'rgba(0,0,0,0.4)',
        },
        content: (
          <div className="container m-auto">
            {loading && !content ? (
              <div className="text-white"></div>
            ) : (
              <div className="md:w-3/4 md:max-w-2xl">
                <div className="w-full mt-36 md:flex md:flex-row md:h-56 mb-3">
                  {/* left */}
                  <div className="md:flex-auto md:mr-3 md:h-full">
                    <div className="w-full bg-white bg-opacity-50 mb-3 p-3 rounded md:h-full">
                      <h2 className="font-bold text-xl mb-4">
                        Toronto Head Office
                      </h2>
                      <p className="mb-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: content?.address!,
                          }}
                        />
                      </p>

                      <p>
                        {/* Toll Free: <b>(983)-371-3850</b>
                    <br /> */}
                        Tel: <b>{content?.tel}</b>
                        <br /> Email:{' '}
                        <a
                          className="font-bold"
                          href={`mailto:${content?.email}`}
                        >
                          {content?.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  {/* right */}
                  <div className="md:flex-auto md:h-full">
                    <div className="bg-white bg-opacity-50 rounded p-3 mb-3 md:h-full">
                      <h2 className="font-bold text-xl mb-4">Office Hours</h2>
                      <p className="mb-4">
                        Monday to Friday
                        <br />
                        <b>{content?.monday_to_friday}</b>
                      </p>
                      <p className="mb-4">
                        Saturday & Sunday
                        <br />
                        <b>{content?.saturday_and_sunday}</b>
                      </p>
                      <p>
                        Statutory Holidays
                        <br />
                        <b>{content?.statutory_holidays}</b>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full rounded p-3">
                  <Subscribe />
                </div>
              </div>
            )}
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    />
  )
}

export default ContactPage
