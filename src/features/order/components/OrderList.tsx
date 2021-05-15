import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { OrderDTO } from 'swagger/models';

import { formatDate } from 'utils/date';
import { canCancel, OrderState, stateTranslations } from 'utils/orderStates';

interface OrderListProps {
  orders: OrderDTO[];
  error: string;
  loading: boolean;
  onCancel: (orderId: number) => void;
}

export const OrderList = ({
  orders,
  error,
  loading,
  onCancel,
}: OrderListProps): JSX.Element => {
  const { department } = useAuth();
  const navigate = useNavigate();

  const handleCancel = (orderId: number | undefined): void => {
    if (orderId) onCancel(orderId);
  };

  const handleEditOrder = (orderId: number | undefined): void => {
    if (orderId) navigate(`/order/${orderId}`);
  };

  if (error) {
    return (
      <div className="pb-4">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pb-4">
        <p className="text-center">Kraunama...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pb-4">
        <p className="text-center">Nėra užsakymų</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left whitespace-no-wrap table-auto table-stripped">
      <thead>
        <tr className="text-sm font-medium tracking-wider text-gray-900 border-b-2 border-gray-400 title-font">
          <th className="px-4 py-3">#</th>
          <th className="px-4 py-3">Sandėlio adresas</th>
          <th className="px-4 py-3">Užsakovo adresas</th>
          <th className="px-4 py-3">Numatytas pristatymas</th>
          <th className="px-4 py-3">Statusas</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          const { orderId, addressFrom, addressTo, expectedDelivery } = order;
          const { date: deliveryDate } = formatDate(expectedDelivery);
          const state = order.orderState as OrderState;

          return (
            <tr key={orderId}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{addressFrom}</td>
              <td className="px-4 py-3">{addressTo}€</td>
              <td className="px-4 py-3">{deliveryDate}</td>
              <td className="px-4 py-3">{stateTranslations[state]}</td>
              <td className="px-4 py-3 text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  onClick={() => handleEditOrder(orderId)}
                >
                  Redaguoti
                </button>
                {canCancel(state, department) ? (
                  <button
                    className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                    type="button"
                    onClick={() => handleCancel(orderId)}
                  >
                    Atšaukti
                  </button>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
