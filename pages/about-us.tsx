import { Layout } from '@components/common'

const AboutUsPage = () => {
  return (
    <Layout
      banner={{
        bg: {
          src: '/bg/about-us.png',
          mask: 'rgba(0,0,0,0.4)',
          height: '500px',
        },
        content: (
          <div className="container m-auto">
            <div className="w-full mt-16">
              <h1 className="text-white text-5xl text-center leading-tight mb-8">
                <span className="max-w-lg inline-block">About Us</span>
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
      <div className="container m-auto py-8">
        <h2 className="font-bold text-2xl mb-6">
          Total Solution For Your Business Needs
        </h2>
        <p className="text-gray-600 mb-4">
          We are a one-stop shop for all store displays, store fixtures, store
          supplies and signage systems. We have over 2,000 items in stock at
          competitive prices with the best selection to ensure that we will be
          able to fulfill your store fixture requirements. We also provide
          customized services from concept to completion, as well as
          comprehensive metal-works, welding and millwork to satisfy all your
          display and signage needs.
        </p>
        <p className="text-gray-600">
          Our products can be easily found all over the world including North
          America and Europe. We provide a full-customized service for product
          design, comprehensive metal work, and acrylic fabrication at a
          competitive price. We also provide a complete product manufacturing
          capability including powder coating, plastic fabrication, CNC
          machining, punching machining, bending machinery and shear machining,
          all of which can produce a wide variety of products.
        </p>

        <br />
        <br />

        <h2 className="font-bold text-2xl mb-6">
          Providing B2B services From Standard Sign Products to Customized
          Solutions
        </h2>
        <p className="text-gray-600 mb-4">
          Our professional team is diverse and dynamic providing a range of
          products from standard products to custom designed displays. We ship
          locally and export globally to satisfy all your display and signage
          needs. The production facilities provide professional services from
          concept to completion to ensure that every need is met beyond
          expectation and within budget.
        </p>
        <p className="text-gray-600">
          Today, our own product lines, supply chains, sales and design teams to
          support a variety of innovative products. These products include floor
          sign holders, flag holders, sidewalk sign holders, acrylic displays,
          realty signs, and many more.
        </p>

        <br />
        <br />

        <h2 className="font-bold text-2xl mb-6">
          Custom Service and Special Order
        </h2>
        <p className="text-gray-600">
          Our own manufacturer, marketing department, research department and
          warehouse provide full line services for in stock items, customized
          products and special orders from small quantities to volume orders.
        </p>
      </div>
    </Layout>
  )
}

export default AboutUsPage
