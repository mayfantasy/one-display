import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import PriceItem from 'components/common/PriceItem'
import { format } from 'date-fns'
import { useState } from 'react'
import { IOrder } from 'types/order.types'
import OrderCollapsableDetail from './OrderCollapsableDetail'

interface IProps {
  order?: IOrder
}

const OrderCollapsable = (props: IProps) => {
  const { order } = props
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* Row */}
      <div
        className={`flex flex-row p-2 border-b border-gray-700 text-center ${
          order ? '' : 'bg-gray-200'
        }`}
      >
        <div className="w-28">
          {order ? (
            format(new Date(order.date_created), 'yyyy-MM-dd')
          ) : (
            <b>Date</b>
          )}
        </div>
        <div className="w-15">{order ? order.id : <b>ID</b>}</div>
        <div className="w-40">{order ? order.status : <b>Status</b>}</div>
        <div className="w-40">
          {order ? order.payment_status : <b>Payment</b>}
        </div>
        <div className="w-20">{order ? order.items_total : <b>Items</b>}</div>
        <div className="w-20">
          {order ? <PriceItem amount={order.total_inc_tax} /> : <b>Total</b>}
        </div>
        <div className="w-20 ">
          {order ? (
            open ? (
              <MinusCircleFilled
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            ) : (
              <PlusCircleFilled
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )
          ) : (
            <b>Detail</b>
          )}
        </div>
      </div>
      {/* Detail */}
      {order && open && (
        <div className="p-2 bg-gray-100">
          <OrderCollapsableDetail order={order} />
        </div>
      )}
    </div>
  )
}

export default OrderCollapsable
