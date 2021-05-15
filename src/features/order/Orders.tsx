import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetOrdersDTO, OrderDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';

import { OrderList } from './components/OrderList';
import { cancelOrder, getOrders } from './services/OrderService';

export const Orders = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [cancelOrderId, setCancelOrderId] = useState<number | undefined>(
    undefined
  );

  const fetchOrders = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getOrders();

      if (response.status === 403) {
        setError('Neturite prieigos');
        return;
      }

      const data: GetOrdersDTO = await response.json();
      setOrders(data.data as OrderDTO[]);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = (): void => {
    navigate('new');
  };

  const handleCloseModal = (): void => {
    setCancelError('');
    setCancelOrderId(undefined);
  };

  const handleCancel = (pharmacyId: number): void => {
    setCancelOrderId(pharmacyId);
  };

  const handleCancelConfirm = async (): Promise<void> => {
    if (cancelOrderId === undefined) return;

    try {
      const response = await cancelOrder(cancelOrderId);

      if (response.status !== 200)
        throw new Error('Nepavyko atšaukti užsakymo');

      handleCloseModal();
      await fetchOrders();
    } catch (error) {
      setCancelError(error?.message ?? '');
    }
  };

  const isCancelModalOpen = cancelOrderId !== undefined;

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Užsakymai
          </h1>

          <Button.Primary className="sm:ml-2" onClick={handleCreateOrder}>
            Pridėti užsakymą
          </Button.Primary>
        </div>
        <OrderList
          orders={orders}
          error={error}
          loading={loading}
          onCancel={handleCancel}
        />
      </Content>
      <Pagination />
      <Modal
        isOpen={isCancelModalOpen}
        title="Atšaukti užsakymą"
        content="Ar tikrai norite atšaukti užsakymą?"
        error={cancelError}
        buttons={
          <>
            <Button.Danger className="sm:ml-2" onClick={handleCancelConfirm}>
              Patvirtinti atšaukimą
            </Button.Danger>
            <Button.Secondary onClick={handleCloseModal}>
              Atšaukti
            </Button.Secondary>
          </>
        }
      />
    </Container>
  );
};
