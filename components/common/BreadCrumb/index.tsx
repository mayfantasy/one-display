import {
  getCategoryTreeByIdPath,
  getSubCategoryBlockId,
} from 'helpers/category.helpers'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'

interface IProps {
  category: number
  subCategory?: number
}

const BreadCrumb = (props: IProps) => {
  const { category, subCategory } = props

  return (
    <div className="text-gray-500 flex items-center justify-center md:justify-start">
      <Link href={pageRoutes.categoryPage(category).url!}>
        <a className="inline-block hover:text-black">
          {getCategoryTreeByIdPath([category])?.name}
        </a>
      </Link>
      <span className="ml-1 mr-1">/</span>
      {subCategory ? (
        <span className="inline-block hover:text-black">
          <Link
            href={
              `${pageRoutes.categoryPage(category).url}#${getSubCategoryBlockId(
                subCategory
              )}`!
            }
          >
            <a>{getCategoryTreeByIdPath([category, subCategory])?.name}</a>
          </Link>
        </span>
      ) : null}
    </div>
  )
}

export default BreadCrumb
