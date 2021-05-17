import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPharmacy } from 'features/pharmacy/services/PharmacyService';
import { useAuth } from 'hooks/useAuth';
import {
  CreateTransactionDTO,
  EnumDTO,
  GetEnumerableDTO,
  PharmacyFullDTO,
  RegisterDTO,
} from 'swagger/models';

import { Layout } from 'components/Layout';

import { SaleForm } from './components/SaleForm';
import { getPaymentTypes } from './services/PaymentTypeService';
import { createTransaction } from './services/TransactionService';

export const CreateSale = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState<EnumDTO[]>([]);
  const [registers, setRegisters] = useState<RegisterDTO[]>([]);

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

  const pharmacyId = user?.pharmacyId;

  useEffect(() => {
    const fetchRegisters = async (): Promise<void> => {
      if (!pharmacyId) return;

      setLoading(true);
      try {
        const response = await getPharmacy(pharmacyId);
        const data = await response.json();
        const pharmacy = data.data as PharmacyFullDTO;
        setRegisters(pharmacy.registers ?? []);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisters();
  }, [pharmacyId]);

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
        registers={registers}
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
