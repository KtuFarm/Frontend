import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getWarehouses } from 'features/warehouse/service/WarehouseService';
import { CreateOrderDTO, GetWarehousesDTO, WarehouseDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { OrderForm } from './components/OrderForm';
import { createOrder } from './services/OrderService';

export const CreateOrder = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);

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
    fetchWarehouses();
  }, []);

  const handleSubmit = async (order: CreateOrderDTO): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await createOrder(order);

      if (response.status !== 201) throw new Error('Nepavyko sukurti užsakymo');

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
    <Layout title="Naujas užsakymas">
      <OrderForm
        loading={loading}
        warehouses={warehouses}
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
      />
    </Layout>
  );
};
