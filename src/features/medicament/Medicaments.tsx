import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMedicamentsDTO, MedicamentDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';

import { MedicamentList } from './components/MedicamentList';
import { getMedicaments, removeMedicament } from './services/MedicamentService';

export const Medicaments = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [loading, setLoading] = useState(false);
  const [medicaments, setMedicaments] = useState<MedicamentDTO[]>([]);
  const [deleteMedicamentId, setDeleteMedicamentId] = useState<
    number | undefined
  >(undefined);

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

  useEffect(() => {
    fetchMedicaments();
  }, []);

  const handleCreatePharmacy = (): void => {
    navigate('new');
  };

  const handleCloseModal = (): void => {
    setDeleteError('');
    setDeleteMedicamentId(undefined);
  };

  const handleDelete = (pharmacyId: number): void => {
    setDeleteMedicamentId(pharmacyId);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (deleteMedicamentId === undefined) return;

    try {
      const response = await removeMedicament(deleteMedicamentId);

      if (response.status !== 200) throw new Error('Nepavyko ištrinti vaisto');

      handleCloseModal();
      await fetchMedicaments();
    } catch (error) {
      setDeleteError(error?.message ?? '');
    }
  };

  const isDeleteModalOpen = deleteMedicamentId !== undefined;

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Vaistai
          </h1>

          <Button.Primary className="sm:ml-2" onClick={handleCreatePharmacy}>
            Pridėti vaistą
          </Button.Primary>
        </div>
        <MedicamentList
          medicaments={medicaments}
          error={error}
          loading={loading}
          onDelete={handleDelete}
        />
      </Content>
      <Pagination />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Ištrinti vaistą"
        content="Ar tikrai norite ištrinti vaistą? Vaisto duomenys bus pašalinti visam laikui. Šio veiksmo negalima anuliuoti."
        error={deleteError}
        buttons={
          <>
            <Button.Danger className="sm:ml-2" onClick={handleDeleteConfirm}>
              Ištrinti
            </Button.Danger>
            <Button.Secondary onClick={handleCloseModal}>
              Atšaukti
            </Button.Secondary>
          </>
        }
      />
    </Container>
  );
};
