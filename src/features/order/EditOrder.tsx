import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getWarehouses } from 'features/warehouse/service/WarehouseService';
import {
  CreateOrderDTO,
  GetWarehousesDTO,
  OrderFullDTO,
  WarehouseDTO,
} from 'swagger/models';

import { Layout } from 'components/Layout';

import { OrderForm } from './components/OrderForm';
import { createOrder, getOrder } from './services/OrderService';

export const EditOrder = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);
  const [order, setOrder] = useState<OrderFullDTO | null>(null);

  const orderId = params?.id ?? '';

  const fetchWarehouses = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getWarehouses();
      const data: GetWarehousesDTO = await response.json();
      setWarehouses(data.data as WarehouseDTO[]);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrder = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getOrder(orderId);
        const data = await response.json();
        setOrder(data?.data as OrderFullDTO);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async (order: CreateOrderDTO): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await createOrder(order);

      if (response.status !== 200) throw new Error('Nepavyko sukurti užsakymo');

      navigate('/order');
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClearError = useCallback((): void => {
    setError('');
  }, []);

  return (
    <Layout title={`Redaguoti užsakymą #${orderId}`}>
      <OrderForm
        loading={loading}
        warehouses={warehouses}
        error={error}
        submitting={submitting}
        order={order}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
      />
    </Layout>
  );
};
