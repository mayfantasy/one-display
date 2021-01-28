import { ProductNode } from '@framework/api/operations/get-product'
import { pageRoutes } from 'helpers/route.helpers'
import Image from 'next/image'
import Link from 'next/link'
import { ISimpleCategory } from 'types/category.types'
import { IProduct } from 'types/product.types'

interface IProps {
  product: IProduct
}

const ProductCard = (props: IProps) => {
  const { product } = props

  return (
    <Link href={pageRoutes.productPage(product.id).url!}>
      <a className="block w-full rounded border border-gray-300 hover:border-blue-700 overflow-hidden cursor-pointer">
        {/* Image */}
        <div className="w-full flex flex-row justify-center relative overflow-hidden">
          <div className="responsive-square" />
          <div className="w-full h-full absolute flex flex-row items-center">
            <img
              className="w-full transform hover:scale-125 transition duration-200"
              alt={product.name}
              src={product.primary_image?.url_standard || '/logo/logo.png'}
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-100 h-52 rounded-b py-10 px-4">
          <div className="w-full top-10">
            <h2 className="text-lg text-left mb-4">
              <strong>{product.name}</strong>
            </h2>
            <div
              className="text-left text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>

        {/* <div className="absolute w-full">123</div> */}
      </a>
    </Link>
  )
}

export default ProductCard
