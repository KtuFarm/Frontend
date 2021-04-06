import { useState } from 'react';

import { PharmacyForm } from './components/PharmacyForm';
import { PharmacyDTO } from './dtos/PharmacyDTO';
import { createPharmacy } from './services/PharmacyService';

export const CreatePharmacy = (): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClearError = (): void => {
    setError('');
  };

  const handleSubmit = async (pharmacy: PharmacyDTO): Promise<void> => {
    setSubmitting(true);
    try {
      await createPharmacy(pharmacy);
    } catch (error) {
      setError('Failed to create pharmacy');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PharmacyForm
      onSubmit={handleSubmit}
      onClearError={handleClearError}
      submitting={submitting}
      error={error}
    />
  );
};
