import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetReportDTO, ReportFullDTO } from 'swagger/models';

import { Container } from 'components/Container';
import { Content } from 'components/Content';

import { Report } from './components/Report';
import { getReport } from './services/ReportService';

export const ViewReport = (): JSX.Element => {
  const params = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportFullDTO | null>(null);

  const reportId = params?.id ?? '';

  useEffect(() => {
    const fetchReport = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getReport(reportId);

        if (response.status === 403) {
          setError('Neturite prieigos');
          return;
        }

        const data: GetReportDTO = await response.json();
        setReport(data?.data ?? null);
      } catch (error) {
        setError(error?.message ?? '');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  return (
    <Container>
      <Content withPadding={false}>
        <div className="w-full p-8">
          <h1 className="pb-8 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Ataskaita #{reportId}
          </h1>
          <Report report={report} error={error} loading={loading} />
        </div>
      </Content>
    </Container>
  );
};
