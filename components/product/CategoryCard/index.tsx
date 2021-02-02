import { pageRoutes } from 'helpers/route.helpers'
import Image from 'next/image'
import Link from 'next/link'
import { ISimpleCategory } from 'types/category.types'

interface IProps {
  category: ISimpleCategory
}

const CategoryCard = (props: IProps) => {
  const { category } = props
  return (
    <Link href={pageRoutes.categoryPage(category.id).url!}>
      <a className="block w-full rounded border border-gray-300 hover:border-blue-700 overflow-hidden cursor-pointer bg-gray-100">
        {/* Image */}
        <div className="w-full flex flex-row justify-center relative overflow-hidden bg-white">
          <div className="responsive-square" />
          <div className="w-full h-full absolute flex flex-row items-center">
            <img
              className="w-full transform hover:scale-125 transition duration-200"
              alt={category.name}
              src={category.main_image?.src!}
            />
          </div>
        </div>

        {/* Description */}
        <div className="rounded-b py-10 px-4">
          <div className="w-full top-10">
            <h2 className="text-lg text-center mb-4">
              <strong>{category.name}</strong>
            </h2>
            <p className="text-center text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* <div className="absolute w-full">123</div> */}
      </a>
    </Link>
  )
}

export default CategoryCard
