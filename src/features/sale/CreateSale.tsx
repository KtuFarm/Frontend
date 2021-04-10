import { Layout } from 'components/Layout';

import { SaleForm } from './components/SaleForm';

export const CreateSale = (): JSX.Element => {
  return (
    <Layout title="Naujas pardavimas">
      <SaleForm />
    </Layout>
  );
};
