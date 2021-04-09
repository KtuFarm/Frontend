import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateMedicamentDTO, PharmaceuticalFormDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { MedicamentForm } from './components/MedicamentForm';
import {
  createMedicament,
  getPharmaceuticalForms,
} from './services/MedicamentService';

export const CreateMedicament = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pharmaceuticalForms, setPharmaceuticalForms] = useState<
    PharmaceuticalFormDTO[]
  >([]);

  useEffect(() => {
    const fetchPharmaceuticalForms = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getPharmaceuticalForms();
        const data = await response.json();
        setPharmaceuticalForms(data?.data as PharmaceuticalFormDTO[]);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };

    fetchPharmaceuticalForms();
  }, []);

  const handleClearError = useCallback((): void => {
    setError('');
  }, []);

  const handleSubmit = async (
    medicament: CreateMedicamentDTO
  ): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await createMedicament(medicament);

      if (response.status !== 201) throw new Error('Nepavyko sukurti vaisto');

      navigate('/medicament');
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Layout title="Pridėti vaistą">
      <MedicamentForm
        pharmaceuticalForms={pharmaceuticalForms}
        loading={loading}
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
      />
    </Layout>
  );
};
