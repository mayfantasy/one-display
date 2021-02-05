export interface IProductImage {
  data: IProductImageData[]
}

export interface IProductImageData {
  id: number
  image_file: string
  is_thumbnail: boolean
  sort_order: number
  url_standard: string
  url_thumbnail: string
}
