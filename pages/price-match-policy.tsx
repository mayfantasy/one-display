import Layout from 'components/common/Layout'
import {
  useAboutUsContent,
  usePriceMatchPolicyContent,
} from 'hooks/content.hooks'
import Skeleton from 'react-loading-skeleton'

const PriceMatchPolicyPage = () => {
  const { loading, content } = usePriceMatchPolicyContent()

  return (
    <Layout
      pageTitle="Price Match Policy"
      banner={{
        bg: {
          src: '/bg/price-match-policy.jpg',
          mask: 'rgba(0,0,0,0.4)',
          height: '300px',
        },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-36">
              <h1 className="text-white text-5xl text-center leading-tight mb-8">
                <span className="max-w-lg inline-block">
                  Price Match Policy
                </span>
              </h1>
              <p className="text-white text-center">
                <span className="max-w-lg inline-block">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content?.page_description || '',
                    }}
                  />
                </span>
              </p>
            </div>
          </div>
        ),
      }}
      header={{ navColor: 'white' }}
    >
      <div className="container m-auto py-8">
        {loading ? (
          <Skeleton height={500} />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: content?.page_article || '',
            }}
          />
        )}
      </div>
    </Layout>
  )
}

export default PriceMatchPolicyPage
