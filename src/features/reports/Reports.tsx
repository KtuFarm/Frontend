import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetReportsDTO, ReportDTO } from 'swagger/models';

import { Button } from 'components/Button';
import { Container } from 'components/Container';
import { Content } from 'components/Content';

import { ReportList } from './components/ReportList';
import { getReports } from './services/ReportService';

export const Reports = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ReportDTO[]>([]);

  const fetchReports = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getReports();

      if (response.status === 403) {
        setError('Neturite prieigos');
        return;
      }

      const data: GetReportsDTO = await response.json();
      setReports((data?.data as ReportDTO[]) ?? []);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateReport = (): void => {
    navigate('new');
  };

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Ataskaitos
          </h1>

          <Button.Primary className="sm:ml-2" onClick={handleCreateReport}>
            Sugeneruoti naują ataskaitą
          </Button.Primary>
        </div>
        <ReportList reports={reports} error={error} loading={loading} />
      </Content>
    </Container>
  );
};
