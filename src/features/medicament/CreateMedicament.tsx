import { Layout } from 'components/Layout';

import { MedicamentForm } from './components/MedicamentForm';

export const CreateMedicament = (): JSX.Element => {
  return (
    <Layout title="Pridėti vaistą">
      <MedicamentForm />
    </Layout>
  );
};
