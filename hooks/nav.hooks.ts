import { useUI } from '@components/ui/context'
import { pageRoutes } from 'helpers/route.helpers'
import { INavItem } from 'types/nav.types'

export const useNav = (): INavItem[] => {
  const { displayProductMenu, openProductMenu, closeProductMenu } = useUI()
  return [
    pageRoutes.homePage,
    pageRoutes.aboutPage,
    {
      key: pageRoutes.categoryListPage.key,
      name: 'Products',
      children: true,
      onClick: () => {
        if (displayProductMenu) {
          closeProductMenu()
        } else {
          openProductMenu()
        }
      },
    },
    pageRoutes.contactPage,
  ]
}
