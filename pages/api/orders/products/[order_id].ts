import { NextApiRequest, NextApiResponse } from 'next'
import { api as apiV2 } from 'requests/serverV2'
import { api as apiV3 } from 'requests/server'
import { IOrderProduct, IOrderProductWithImages } from 'types/order.types'
import { IProductImage, IProductImageData } from 'types/image.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const order_id = req.query.order_id as string
      // Get products for each order
      const productsRes = await apiV2.get<IOrderProduct[]>(
        `/orders/${order_id}/products`
      )

      const productsWithImages: IOrderProductWithImages[] = productsRes.data.map(
        (p) => ({ product: p, images: [] })
      )

      // Get products for each order
      const getProductImagesByProductId = async (id: number) => {
        const imagesRes = await apiV3.get<IProductImage>(
          `/catalog/products/${id}/images`
        )
        return imagesRes.data.data
      }

      for (let i = 0; i < productsWithImages.length; i++) {
        const images = await getProductImagesByProductId(
          productsWithImages[i].product.product_id
        )
        productsWithImages[i].images = images
      }
      res.statusCode = 200
      res.json({ result: { products: productsWithImages } })
    } catch (e) {
      res.statusCode = 500
      res.json({ error: e.message })
    }
  } else {
    res.statusCode = 500
    res.json({ error: 'Request method not supported.' })
  }
}
