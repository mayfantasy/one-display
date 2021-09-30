export interface ISimpleCategory {
  id: number
  parent_id: number
  name: string
  is_visible?: boolean
  url?: string
  main_image?: IImage
  images?: IImage[]
  banner_image?: IImage
  description?: string
  children?: ISimpleCategory[]
  pdfUrl?: string
}

export interface IImage {
  src: string
  width: number
  height: number
}

export interface ICategory {
  custom_url: { url: string; is_customized: boolean }
  default_product_sort: string
  description: string
  id: number
  image_url: string
  is_visible: true
  layout_file: string
  meta_description: string
  meta_keywords: string[]
  name: string
  page_title: string
  parent_id: number
  search_keywords: string
  sort_order: number
  views: number
}
