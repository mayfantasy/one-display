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
import { useRouter } from 'next/router'
import { url } from 'inspector'

interface IProps {}

const ProductMenu = (props: IProps) => {
  const {} = props
  const router = useRouter()

  const [activeCategory, setActiveCategory] = useState<
    ISimpleCategory | undefined
  >(getCategoryTreeByIdPath([24]))

  const [activeSubCategory, setActiveSubCategory] = useState<
    ISimpleCategory | undefined
  >(getCategoryTreeByIdPath([24, 39]))

  const { displayProductMenu, closeProductMenu } = useUI()
  useEscClose(closeProductMenu, displayProductMenu)

  useEffect(() => {
    closeProductMenu()
  }, [router.asPath])

  return (
    <>
      <div>
        {displayProductMenu && (
          <ScrollLock>
            <div
              // style={{ top: NAV_HEIGHT }}
              className="fixed md:w-full p-4 z-20 top-10"
            >
              <div
                className="absolute w-full h-full top-0 left-0"
                onClick={() => {
                  closeProductMenu()
                }}
              />
              <div
                role="dialog"
                className="relative z-10 bg-white container m-auto p-6 border shadow-lg w-full"
                style={{
                  height: `calc(100vh - ${NAV_HEIGHT * 2}px)`,
                  borderRadius: 10,
                  maxHeight: 800,
                  maxWidth: 1024,
                }}
                // ref={ref}
              >
                {/* <div className="flex flex-row justify-end">
                <CloseOutlined
                  onClick={() => {
                    closeProductMenu()
                  }}
                  aria-label="Close panel"
                  className=""
                />
              </div> */}

                <div className="flex flex-row h-full">
                  {/* Category list */}
                  <ul className="w-1/2 md:w-1/4 h-full overflow-scroll hide-scrollbar">
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
                                isActive ? '' : ''
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
                    <ul className="w-1/2 md:w-1/4 h-full overflow-scroll hide-scrollbar">
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
                                  isActive ? '' : ''
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
                  {activeCategory && (
                    // Image gallary

                    // <div className="w-2/4 overflow-scroll">
                    //   <Gallery
                    //     columns={2}
                    //     photos={activeCategory?.images || []}
                    //   />
                    // </div>

                    // Image backround
                    <div
                      className="w-full h-full hidden md:block"
                      style={{
                        backgroundImage: `url(
                        ${activeCategory?.images?.[0]?.src || ''}
                      )`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </ScrollLock>
        )}
      </div>
    </>
  )
}

export default ProductMenu
