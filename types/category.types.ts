export interface ISimpleCategory {
  id: number
  parent_id: number
  name: string
  is_visible?: boolean
  url?: string
  images?: IImage[]
  children?: ISimpleCategory[]
}

export interface IImage {
  src: string
  width: number
  height: number
}
