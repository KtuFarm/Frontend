import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPharmacyTransactions } from 'features/pharmacy/services/PharmacyService';
import { GetTransactionsDTO, TransactionDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';

import { TransactionList } from './components/TransactionList';

export const Sales = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  const fetchTransactions = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getPharmacyTransactions(1);
      const data: GetTransactionsDTO = await response.json();
      setTransactions(data.data as TransactionDTO[]);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Transakcijos
          </h1>

          <Link to="new" className="sm:ml-2">
            <Button.Primary>Pardavimas</Button.Primary>
          </Link>
        </div>
        <TransactionList
          transactions={transactions}
          error={error}
          loading={loading}
        />
      </Content>
    </Container>
  );
};
