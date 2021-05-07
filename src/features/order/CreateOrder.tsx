import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { CreateOrderDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { OrderForm } from './components/OrderForm';
import { createOrder } from './services/OrderService';

export const CreateOrder = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
      />
    </Layout>
  );
};
