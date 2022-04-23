import Layout from 'components/common/Layout'
import CategoryCard from '@components/product/CategoryCard'
import { categoryTree } from 'helpers/category.helpers'
import Button from '@components/common/Button'
import { useUI } from '@components/ui/context'
import { useCustomerId } from 'hooks/customer.hooks'

const CategoriesPage = () => {
  const customerId = useCustomerId()
  const { openModal } = useUI()
  return (
    <>
      <Layout
        pageTitle="Categories"
        banner={{
          bg: {
            // src: '/bg/categories.jpeg',
            src: '/bg/about-us.png',
            mask: 'rgba(0,0,0,0.4)',
            // height: '500px',
          },
          content: (
            <div className="container m-auto">
              <div className="w-full mt-56">
                <h1 className="text-white text-5xl text-center leading-tight mb-8">
                  <span className="max-w-lg inline-block">
                    Product Catalogue
                  </span>
                </h1>
                <p className="text-white text-center">
                  <span className="max-w-lg inline-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna a
                    liqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco
                  </span>
                </p>
                <br />
                {/* <p className="text-center">
                  {!customerId && (
                    <Button
                      aria-label="Login to view price and purchase"
                      primary
                      onClick={openModal}
                    >
                      Login to view Catalogue
                    </Button>
                  )}
                  {customerId && (
                    <a
                      href="https://storage.googleapis.com/catalogue-pdfs/combinepdf.pdf"
                      target="_blank"
                    >
                      <Button primary>Download Catalogue</Button>
                    </a>
                  )}
                </p> */}
              </div>
            </div>
          ),
        }}
        header={{ navColor: 'white' }}
      >
        {/* <div className="container m-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryTree.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div> */}
      </Layout>
    </>
  )
}

export default CategoriesPage
