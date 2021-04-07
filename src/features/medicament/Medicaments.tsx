import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetMedicamentsDTO, MedicamentDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';

import { MedicamentList } from './components/MedicamentList';
import { getMedicaments } from './services/MedicamentService';

export const Medicaments = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [medicaments, setMedicaments] = useState<MedicamentDTO[]>([]);

  useEffect(() => {
    const fetchMedicaments = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getMedicaments();
        const data: GetMedicamentsDTO = await response.json();
        setMedicaments(data.data as MedicamentDTO[]);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicaments();
  }, []);

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Vaistai
          </h1>

          <Link to="new" className="sm:ml-2">
            <Button.Primary>Pridėti vaistą</Button.Primary>
          </Link>
        </div>
        <MedicamentList
          medicaments={medicaments}
          error={error}
          loading={loading}
        />
      </Content>
      <Pagination />
      <Modal
        isOpen={false}
        title="Ištrinti vaistą"
        content="Ar tikrai norite ištrinti vaistą? Vaisto duomenys bus pašalinti visam laikui. Šio veiksmo negalima anuliuoti."
        buttons={
          <>
            <Button.Danger className="sm:ml-2">Ištrinti</Button.Danger>
            <Button.Secondary>Atšaukti</Button.Secondary>
          </>
        }
      />
    </Container>
  );
};
