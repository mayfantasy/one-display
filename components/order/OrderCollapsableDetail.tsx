import { useOrderProducts, useOrderShippingAddress } from 'hooks/orders.hooks'
import { IOrder } from 'types/order.types'
import Image from 'next/image'
import { CURRENCY_PREFIX } from 'helpers/constant.helpers'
import PriceItem from '@components/common/PriceItem'
import Divider from '@components/common/Divider'

interface IProps {
  order: IOrder
}

const OrderCollapsableDetail = (props: IProps) => {
  const { order } = props
  const { products, loading: loadingProducts } = useOrderProducts(order.id)
  const { address, loading: loadingShippingAddress } = useOrderShippingAddress(
    order.id
  )
  return (
    <div>
      {/* Products */}
      {loadingProducts && <span>Loading items...</span>}
      {products?.map((p) => (
        <div className="flex items-center mb-1" key={p.product.id}>
          <div className="mr-2">
            <Image
              width={70}
              height={70}
              src={p.images[0].url_thumbnail || '/square-placeholder.jpg'}
            />
          </div>
          <div>
            <div>
              <b>{p.product.name}</b>
            </div>
            <div className="flex items-center">
              <div className="mr-10">
                Item Price: <PriceItem amount={p.product.price_ex_tax} />
              </div>
              <div className="mr-10">
                Tax: <PriceItem amount={p.product.price_tax} />
              </div>

              <div className="mr-10">QTY {p.product.quantity}</div>

              <div>
                Total: <PriceItem amount={p.product.price_inc_tax} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Divider />

      {/* Meta */}
      <div className="flex justify-between mr-4">
        {/* Shipping Address */}
        {loadingShippingAddress ? (
          <span>Loading shipping address...</span>
        ) : (
          <div>
            <h2 className="mb-2">Shipping Address</h2>
            <div className="text-gray-500">
              <div>
                <span>{address?.company}</span>
                <span>
                  {address?.first_name} {address?.last_name}
                </span>
              </div>
              <div>
                <span>{address?.street_1}</span>
              </div>
              <div>
                <span>{address?.street_2}</span>
              </div>
              <div>
                <span>
                  {address?.city}, {address?.state}
                </span>
              </div>
              <div>
                <span>
                  {address?.zip}, {address?.country}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Total */}
        <div>
          <div>
            <span className="w-20 inline-block">Subtotal:</span>{' '}
            <span className="w-20 inline-block text-right">
              <PriceItem amount={order.subtotal_inc_tax} />
            </span>
          </div>
          <div>
            <span className="w-20 inline-block">Shipping:</span>{' '}
            <span className="w-20 inline-block text-right">
              <PriceItem amount={order.shipping_cost_inc_tax} />
            </span>
          </div>
          <div className="font-bold mt-2 text-sm">
            <span className="w-20 inline-block">Total:</span>{' '}
            <span className="w-20 inline-block text-right">
              <PriceItem amount={order.total_inc_tax} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCollapsableDetail
