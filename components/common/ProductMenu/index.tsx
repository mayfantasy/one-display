import { useUI } from '@components/ui/context'
import { NAV_HEIGHT } from 'helpers/constant.helpers'
import Portal from '@reach/portal'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'
import { useEscClose } from 'hooks/esc-close'
import {
  ArrowRightOutlined,
  CaretRightOutlined,
  CloseOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { getEnabledCategories } from 'trace_events'
import {
  categoryTree,
  getCategoryTreeByIdPath,
  getSubCategoryBlockId,
} from 'helpers/category.helpers'
import { useEffect, useState } from 'react'
import { ISimpleCategory } from 'types/category.types'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'
import Gallery from 'react-photo-gallery'

interface IProps {}

const ProductMenu = (props: IProps) => {
  const {} = props

  const [activeCategory, setActiveCategory] = useState<
    ISimpleCategory | undefined
  >(getCategoryTreeByIdPath([24]))

  const [activeSubCategory, setActiveSubCategory] = useState<
    ISimpleCategory | undefined
  >(getCategoryTreeByIdPath([24, 39]))

  const { displayProductMenu, closeProductMenu } = useUI()
  useEscClose(closeProductMenu, displayProductMenu)

  return (
    <div>
      {displayProductMenu && (
        <ScrollLock>
          <div style={{ top: NAV_HEIGHT }} className="fixed w-full p-4 z-40">
            <div
              role="dialog"
              className="bg-white container m-auto rounded p-6 border shadow-lg"
              style={{ height: `calc(100vh - ${NAV_HEIGHT * 2}px)` }}
              // ref={ref}
            >
              <div className="flex flex-row justify-end">
                <CloseOutlined
                  onClick={() => {
                    closeProductMenu()
                  }}
                  aria-label="Close panel"
                  className=""
                />
              </div>

              <div className="flex flex-row h-full">
                {/* Category list */}
                <ul className="w-1/4 h-full overflow-scroll">
                  {categoryTree.map((c) => {
                    const isActive = activeCategory?.id === c.id
                    return (
                      <li
                        key={c.id}
                        className="text-gray-500 cursor-pointer"
                        onMouseEnter={() => {
                          setActiveCategory(c)
                          setActiveSubCategory(c.children?.[0])
                        }}
                        onClick={() => closeProductMenu()}
                      >
                        <Link href={pageRoutes.categoryPage(c.id).url!}>
                          <a
                            className={`block h-full p-3 ${
                              isActive ? 'bg-gray-200' : ''
                            } flex flex-row justify-between items-center`}
                          >
                            <span
                              className={`${
                                isActive ? 'font-bold text-black' : ''
                              }`}
                            >
                              {c.name}
                            </span>

                            <RightOutlined className="text-gray-300" />
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>

                {/* Subcategory List */}
                {!!activeCategory?.children?.length && (
                  <ul className="w-1/4 h-full overflow-scroll">
                    {activeCategory.children.map((sc) => {
                      const isActive = activeSubCategory?.id === sc.id
                      return (
                        <li
                          key={sc.id}
                          className="text-gray-500 cursor-pointer"
                          onMouseEnter={() => setActiveSubCategory(sc)}
                          onClick={() => closeProductMenu()}
                        >
                          <Link
                            href={
                              `${
                                pageRoutes.categoryPage(activeCategory.id).url
                              }#${getSubCategoryBlockId(sc.id)}`!
                            }
                          >
                            <a
                              className={`block h-full p-3 ${
                                isActive ? 'bg-gray-200' : ''
                              } flex flex-row justify-between`}
                            >
                              <span
                                className={`${
                                  isActive ? 'font-bold text-black' : ''
                                }`}
                              >
                                {sc.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  // <ul className="w-1/3">
                  //   {activeCategory.children.map((sc) => (
                  //     <li onMouseEnter={() => setActiveSubCategory(sc)}>
                  //       {sc.name}
                  //     </li>
                  //   ))}
                  // </ul>
                )}

                {/* Images */}
                {activeSubCategory && (
                  <div className="w-2/4">
                    <Gallery
                      columns={2}
                      photos={activeSubCategory.images || []}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollLock>
      )}
    </div>
  )
}

export default ProductMenu
