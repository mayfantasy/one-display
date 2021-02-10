import { IProductImageData } from './image.types'
import { IBulkPricingDiscountType } from './product-pricing.types'

export enum IProductStatus {
  available,
  disabled,
  preorder,
}

export interface IBulkPricingRule {
  id: number
  amount: number
  quantity_max: number
  quantity_min: number
  type: IBulkPricingDiscountType
}

export interface IProduct {
  data: IProductData
}
export interface IProductData {
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

  images: IProductImageData[]
  primary_image: IProductImageData

  price: number
  retail_price: number
  sale_price: number
  calculated_price: number
  price_hidden_label: string

  bulk_pricing_rules: IBulkPricingRule[]

  variants: IVariant[]
}

export interface IVariant {
  bin_picking_number: string
  calculated_price: number
  calculated_weight: number
  cost_price: number
  depth: number
  fixed_cost_shipping_price: number
  gtin: string
  height: number
  id: number
  image_url: string
  inventory_level: number
  inventory_warning_level: number
  is_free_shipping: boolean
  map_price: number
  mpn: string
  price: number
  product_id: number
  purchasing_disabled: boolean
  purchasing_disabled_message: string
  retail_price: number
  sale_price: number
  sku: string
  sku_id: number | null
  upc: string
  weight: number
  width: number
}
