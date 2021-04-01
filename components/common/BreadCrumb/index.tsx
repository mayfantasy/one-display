import {
  getCategoryTreeByIdPath,
  getSubCategoryBlockId,
} from 'helpers/category.helpers'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IProps {
  category: number
  subCategory?: number
}

const BreadCrumb = (props: IProps) => {
  const { category, subCategory } = props

  const [actualCategory, setActualCategory] = useState(
    getCategoryTreeByIdPath([category])
  )
  const [actualSubCategory, setActualSubCategory] = useState(
    subCategory ? getCategoryTreeByIdPath([category, subCategory]) : undefined
  )

  useEffect(() => {
    if (subCategory && !getCategoryTreeByIdPath([category])) {
      setActualCategory(getCategoryTreeByIdPath([subCategory]))
      setActualSubCategory(getCategoryTreeByIdPath([subCategory, category]))
    }
  }, [category, subCategory])

  const foundCategory =
    getCategoryTreeByIdPath([category]) ||
    (subCategory && getCategoryTreeByIdPath([subCategory]))

  return (
    <div className="text-gray-500 flex items-center justify-center md:justify-start">
      <Link href={pageRoutes.categoryPage(category).url!}>
        <a className="inline-block hover:text-black">{actualCategory?.name}</a>
      </Link>
      <span className="ml-3 mr-3">{'>'}</span>
      {subCategory ? (
        <span className="inline-block hover:text-black">
          <Link
            href={
              `${pageRoutes.categoryPage(category).url}#${getSubCategoryBlockId(
                subCategory
              )}`!
            }
          >
            <a>{actualSubCategory?.name}</a>
          </Link>
        </span>
      ) : null}
    </div>
  )
}

export default BreadCrumb
