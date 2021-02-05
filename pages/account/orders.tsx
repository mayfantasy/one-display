import AccountLayout from '@components/common/AccountLayout'
import OrderCollapsable from '@components/order/OrderCollapsable'
import { useOrders } from 'hooks/orders.hooks'

const AccountOrdersPage = () => {
  const { orders, loading } = useOrders()
  return (
    <AccountLayout>
      <div>
        <OrderCollapsable />
        {loading && <span>Loading orders...</span>}
        {orders?.map((o) => (
          <OrderCollapsable order={o} />
        ))}
      </div>
    </AccountLayout>
  )
}

export default AccountOrdersPage
