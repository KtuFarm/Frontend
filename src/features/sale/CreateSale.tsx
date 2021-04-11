import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CreateTransactionDTO,
  EnumDTO,
  GetEnumerableDTO,
} from 'swagger/models';

import { Layout } from 'components/Layout';

import { SaleForm } from './components/SaleForm';
import { getPaymentTypes } from './services/PaymentTypeService';
import { createTransaction } from './services/TransactionService';

export const CreateSale = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState<EnumDTO[]>([]);

  const fetchPaymentTypes = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getPaymentTypes();
      const data: GetEnumerableDTO = await response.json();
      setPaymentTypes(data.data as EnumDTO[]);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentTypes();
  }, []);

  const handleSubmit = async (
    transaction: CreateTransactionDTO
  ): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await createTransaction(transaction);

      if (response.status !== 201)
        throw new Error('Nepavyko sukurti pardavimo');

      navigate('/sale');
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
    <Layout title="Naujas pardavimas">
      <SaleForm
        paymentTypes={paymentTypes}
        loading={loading}
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
      />
    </Layout>
  );
};
