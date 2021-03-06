import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditPharmacyDTO, PharmacyFullDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { PharmacyForm } from './components/PharmacyForm';
import { getPharmacy, updatePharmacy } from './services/PharmacyService';

export const EditPharmacy = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [pharmacy, setPharmacy] = useState<PharmacyFullDTO | null>(null);

  const pharmacyId = params?.id ?? '';

  useEffect(() => {
    const fetchPharmacy = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getPharmacy(pharmacyId);
        const data = await response.json();
        setPharmacy(data?.data as PharmacyFullDTO);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [pharmacyId]);

  const handleClearError = useCallback((): void => {
    setError('');
  }, []);

  const handleSubmit = async (pharmacy: EditPharmacyDTO): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await updatePharmacy(pharmacyId, pharmacy);
      if (response.status !== 200)
        throw new Error('Nepavyko atnaujinti vaistinės');
      navigate('/pharmacy');
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title={`Redaguoti vaistinę #${pharmacyId}`}>
      <PharmacyForm
        onSubmit={handleSubmit}
        onClearError={handleClearError}
        submitting={submitting}
        error={error}
        pharmacy={pharmacy}
        loading={loading}
      />
    </Layout>
  );
};
