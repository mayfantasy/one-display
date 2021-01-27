export interface IRouteItem {
  name: string
  key: string
  url?: string
}

export interface INavItem extends IRouteItem {
  children?: boolean
  onClick?: () => void
}
