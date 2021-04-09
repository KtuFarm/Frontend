import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPharmaciesDTO, PharmacyDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';

import { PharmacyList } from './components/PharmacyList';
import { getPharmacies, removePharmacy } from './services/PharmacyService';

export const Pharmacies = (): JSX.Element => {
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pharmacies, setPhramacies] = useState<PharmacyDTO[]>([]);
  const [deletePharmacyId, setDeletePharmacyId] = useState<number | undefined>(
    undefined
  );

  const fetchPharmacies = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getPharmacies();
      const data: GetPharmaciesDTO = await response.json();
      setPhramacies(data.data as PharmacyDTO[]);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleCloseModal = (): void => {
    setDeleteError('');
    setDeletePharmacyId(undefined);
  };

  const handleDelete = (pharmacyId: number): void => {
    setDeletePharmacyId(pharmacyId);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (deletePharmacyId === undefined) return;

    try {
      const response = await removePharmacy(deletePharmacyId);

      if (response.status !== 200)
        throw new Error('Nepavyko ištrinti vaistinės');

      handleCloseModal();
      await fetchPharmacies();
    } catch (error) {
      setDeleteError(error?.message ?? '');
    }
  };

  const isDeleteModalOpen = deletePharmacyId !== undefined;

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Vaistinės
          </h1>

          <Link to="new" className="sm:ml-2">
            <Button.Primary>Pridėti vaistinę</Button.Primary>
          </Link>
        </div>
        <PharmacyList
          pharmacies={pharmacies}
          error={error}
          loading={loading}
          onDelete={handleDelete}
        />
      </Content>
      <Pagination />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Ištrinti vaistinę"
        content="Ar tikrai norite ištrinti vaistinę? Vaistinės duomenys bus pašalinti visam laikui. Šio veiksmo negalima anuliuoti."
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
