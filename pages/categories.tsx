import { Layout } from '@components/common'
import CategoryCard from '@components/product/CategoryCard'
import { categoryTree } from 'helpers/category.helpers'

const CategoriesPage = () => {
  return (
    <>
      <Layout
        pageTitle="Categories"
        banner={{
          bg: {
            src: '/bg/categories.jpeg',
            mask: 'rgba(0,0,0,0.4)',
            height: '500px',
          },
          content: (
            <div className="container m-auto">
              <div className="w-full mt-36">
                <h1 className="text-white text-5xl text-center leading-tight mb-8">
                  <span className="max-w-lg inline-block">
                    Product Categories
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
              </div>
            </div>
          ),
        }}
        header={{ navColor: 'white' }}
      >
        <div className="container m-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryTree.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CategoriesPage
