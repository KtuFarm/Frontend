import { useEffect, useState } from 'react';
import { PharmaceuticalFormDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { MedicamentForm } from './components/MedicamentForm';
import { getPharmaceuticalForms } from './services/MedicamentService';

export const CreateMedicament = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  return (
    <Layout title="Pridėti vaistą">
      <MedicamentForm
        pharmaceuticalForms={pharmaceuticalForms}
        loading={loading}
        error={error}
      />
    </Layout>
  );
};
