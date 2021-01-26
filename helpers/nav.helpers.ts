import { INavItem } from 'types/nav.types'
import { pageRoutes } from './route.helpers'

export const navItems: INavItem[] = [
  pageRoutes.homePage,
  pageRoutes.aboutPage,
  { ...pageRoutes.categoryPage, name: 'Products', children: true },
  pageRoutes.contactPage,
]
