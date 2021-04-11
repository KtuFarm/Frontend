import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  EditMedicamentDTO,
  MedicamentFullDTO,
  PharmaceuticalFormDTO,
} from 'swagger/models';

import { Layout } from 'components/Layout';

import { MedicamentForm } from './components/MedicamentForm';
import {
  getMedicament,
  getPharmaceuticalForms,
  updateMedicament,
} from './services/MedicamentService';

export const EditMedicament = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pharmaceuticalForms, setPharmaceuticalForms] = useState<
    PharmaceuticalFormDTO[]
  >([]);
  const [medicament, setMedicament] = useState<MedicamentFullDTO | null>(null);

  const medicamentId = params?.id ?? '';

  useEffect(() => {
    const fetchMedicament = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getMedicament(medicamentId);
        const data = await response.json();
        setMedicament(data?.data as MedicamentFullDTO);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicament();
  }, [medicamentId]);

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

  const handleSubmit = async (medicament: EditMedicamentDTO): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await updateMedicament(medicamentId, medicament);

      if (response.status !== 200)
        throw new Error('Nepavyko atnaujinti vaisto');

      navigate('/medicament');
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Layout title="Atnaujinti vaistą">
      <MedicamentForm
        pharmaceuticalForms={pharmaceuticalForms}
        loading={loading}
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
        medicament={medicament}
      />
    </Layout>
  );
};
