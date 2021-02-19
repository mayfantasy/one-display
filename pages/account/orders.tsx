import AccountLayout from 'components/common/AccountLayout'
import OrderCollapsable from '@components/order/OrderCollapsable'
import { useUI } from 'components/ui/context'
import { useOrders } from 'hooks/orders.hooks'

const AccountOrdersPage = () => {
  const { orders, loading } = useOrders()
  const { openModal } = useUI()
  return (
    <AccountLayout pageTitle="My Orders">
      <div>
        {loading && <span>Loading orders...</span>}
        {orders && (
          <>
            <OrderCollapsable />
            {orders.map((o) => (
              <OrderCollapsable order={o} />
            ))}
          </>
        )}

        {!loading && !orders && (
          <div className="text-center">
            Please{' '}
            <a
              onClick={openModal}
              className="underline text-blue-700 cursor-pointer"
            >
              Login
            </a>{' '}
            to track your orders
          </div>
        )}
      </div>
    </AccountLayout>
  )
}

export default AccountOrdersPage
