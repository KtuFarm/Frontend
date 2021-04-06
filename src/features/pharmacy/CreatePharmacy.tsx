import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePharmacyDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { PharmacyForm } from './components/PharmacyForm';
import { createPharmacy } from './services/PharmacyService';

export const CreatePharmacy = (): JSX.Element => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClearError = useCallback((): void => {
    setError('');
  }, []);

  const handleSubmit = async (pharmacy: CreatePharmacyDTO): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await createPharmacy(pharmacy);

      if (response.status !== 201)
        throw new Error('Nepavyko sukurti vaistinės');

      navigate('/pharmacy');
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Pridėti vaistinę">
      <PharmacyForm
        onSubmit={handleSubmit}
        onClearError={handleClearError}
        submitting={submitting}
        error={error}
      />
    </Layout>
  );
};
