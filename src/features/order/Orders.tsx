import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetOrdersDTO, OrderDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';

import { OrderList } from './components/OrderList';
import {
  approveOrder,
  cancelOrder,
  getOrders,
  prepareOrder,
} from './services/OrderService';

export const Orders = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [cancelOrderId, setCancelOrderId] = useState<number | undefined>(
    undefined
  );
  const [approveOrderId, setApproveOrderId] = useState<number | undefined>(
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
    setModalError('');
    setCancelOrderId(undefined);
    setApproveOrderId(undefined);
  };

  const handleCancel = (orderId: number): void => {
    setCancelOrderId(orderId);
  };

  const handleApprove = (orderId: number): void => {
    setApproveOrderId(orderId);
  };

  const handlePrepare = async (orderId: number): Promise<void> => {
    try {
      const response = await prepareOrder(orderId);

      if (response.status !== 200)
        throw new Error('Nepavyko paruo??ti u??sakymo');

      await fetchOrders();
    } catch (error) {
      setError(error?.message ?? '');
    }
  };

  const handleCancelConfirm = async (): Promise<void> => {
    if (cancelOrderId === undefined) return;

    try {
      const response = await cancelOrder(cancelOrderId);

      if (response.status !== 200)
        throw new Error('Nepavyko at??aukti u??sakymo');

      handleCloseModal();
      await fetchOrders();
    } catch (error) {
      setModalError(error?.message ?? '');
    }
  };

  const handleApproveConfirm = async (): Promise<void> => {
    if (approveOrderId === undefined) return;

    try {
      const response = await approveOrder(approveOrderId);

      if (response.status !== 200)
        throw new Error('Nepavyko patvirtinti u??sakymo');

      handleCloseModal();
      await fetchOrders();
    } catch (error) {
      setModalError(error?.message ?? '');
    }
  };

  const isCancelModalOpen = cancelOrderId !== undefined;
  const isApproveModalOpen = approveOrderId !== undefined;

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            U??sakymai
          </h1>

          <Button.Primary className="sm:ml-2" onClick={handleCreateOrder}>
            Prid??ti u??sakym??
          </Button.Primary>
        </div>
        <OrderList
          orders={orders}
          error={error}
          loading={loading}
          onCancel={handleCancel}
          onApprove={handleApprove}
          onPrepare={handlePrepare}
        />
      </Content>
      <Pagination />
      <Modal
        isOpen={isCancelModalOpen}
        title="At??aukti u??sakym??"
        content="Ar tikrai norite at??aukti u??sakym???"
        error={modalError}
        buttons={
          <>
            <Button.Danger className="sm:ml-2" onClick={handleCancelConfirm}>
              Patvirtinti at??aukim??
            </Button.Danger>
            <Button.Secondary onClick={handleCloseModal}>
              At??aukti
            </Button.Secondary>
          </>
        }
      />
      <Modal
        isOpen={isApproveModalOpen}
        title="Patvirtinti u??sakym??"
        content="Ar tikrai norite patvirtinti u??sakym???"
        error={modalError}
        buttons={
          <>
            <Button.Primary className="sm:ml-2" onClick={handleApproveConfirm}>
              Patvirtinti u??sakym??
            </Button.Primary>
            <Button.Secondary onClick={handleCloseModal}>
              At??aukti
            </Button.Secondary>
          </>
        }
      />
    </Container>
  );
};
