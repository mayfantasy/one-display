export enum IProductStatus {
  available,
  disabled,
  preorder,
}

export interface IProductImage {
  id: number
  image_file: string
  is_thumbnail: boolean
  sort_order: number
  url_standard: string
  url_thumbnail: string
}

export interface IBulkPricingRule {
  id: number
  amount: number
  quantity_max: number
  quantity_min: number
  type: string
}
export interface IProduct {
  sku: string
  id: number
  brand_id: number
  base_variant_id: number
  availability: IProductStatus

  categories: number[]
  description: string
  fixed_cost_shipping_price: number

  inventory_level: number
  inventory_tracking: string
  inventory_warning_level: number
  is_condition_shown: boolean
  is_featured: boolean
  is_free_shipping: boolean
  is_preorder_only: boolean
  is_price_hidden: boolean
  is_visible: boolean
  map_price: number
  meta_description: string
  name: string
  open_graph_description: string
  open_graph_title: string
  open_graph_type: string
  open_graph_use_image: boolean
  open_graph_use_meta_description: boolean
  open_graph_use_product_name: boolean
  order_quantity_maximum: number
  order_quantity_minimum: number
  page_title: string

  product_tax_code: string
  related_products: number[]

  sort_order: number
  tax_class_id: number
  total_sold: number

  height: number
  weight: number
  width: number

  images: IProductImage[]
  primary_image: IProductImage

  price: number
  retail_price: number
  sale_price: number
  calculated_price: number
  price_hidden_label: string

  bulk_pricing_rules: IBulkPricingRule[]
}
