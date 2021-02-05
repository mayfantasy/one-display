import AccountLayout from '@components/common/AccountLayout'
import OrderCollapsable from '@components/order/OrderCollapsable'
import { useOrders } from 'hooks/orders.hooks'

const AccountOrdersPage = () => {
  const { orders } = useOrders()
  return (
    <AccountLayout>
      <div>
        <OrderCollapsable />
        {orders?.map((o) => (
          <OrderCollapsable order={o} />
        ))}
      </div>
    </AccountLayout>
  )
}

export default AccountOrdersPage
