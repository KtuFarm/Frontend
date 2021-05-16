import { useNavigate } from 'react-router';
import { ReportDTO } from 'swagger/models';

import { formatDate } from 'utils/date';

interface ReportListProps {
  reports: ReportDTO[];
  error: string;
  loading: boolean;
}

export const ReportList = ({
  reports,
  error,
  loading,
}: ReportListProps): JSX.Element => {
  const navigate = useNavigate();

  const handleViewReport = (reportId: number | undefined): void => {
    if (reportId) navigate(`/report/${reportId}`);
  };

  if (error) {
    return (
      <div className="pb-4">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pb-4">
        <p className="text-center">Kraunama...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="pb-4">
        <p className="text-center">Nėra ataskaitų</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left whitespace-no-wrap table-auto table-stripped">
      <thead>
        <tr className="text-sm font-medium tracking-wider text-gray-900 border-b-2 border-gray-400 title-font">
          <th className="px-4 py-3">#</th>
          <th className="px-4 py-3">Nuo</th>
          <th className="px-4 py-3">Iki</th>
          <th className="px-4 py-3">Tipas</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => {
          const { date: dateFrom } = formatDate(report.dateFrom);
          const { date: dateTo } = formatDate(report.dateTo);

          return (
            <tr key={report.code}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{dateFrom}</td>
              <td className="px-4 py-3">{dateTo}</td>
              <td className="px-4 py-3">{report.code}</td>
              <td className="text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  onClick={() => handleViewReport(report.id)}
                >
                  Peržiūrėti
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
