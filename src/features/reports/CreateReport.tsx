import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { CreateReportDTO } from 'swagger/models';

import { Layout } from 'components/Layout';

import { ReportForm } from './components/ReportForm';
import { createReport } from './services/ReportService';

export const CreateReport = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (report: CreateReportDTO): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await createReport(report);

      if (response.status !== 201)
        throw new Error('Nepavyko sugeneruoti ataskaitos');

      navigate('/report');
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClearError = useCallback((): void => {
    setError('');
  }, []);

  return (
    <Layout title="Nauja ataskaita">
      <ReportForm
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClearError={handleClearError}
      />
    </Layout>
  );
};
