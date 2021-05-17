import { ReportFullDTO } from 'swagger/models';

import { formatDate } from 'utils/date';
import { formatMoney } from 'utils/money';

import { reportTypeToId, reportTypeTranslations } from '../models/reportTypes';

interface ReportProps {
  report: ReportFullDTO | null;
  error: string;
  loading: boolean;
}

export const Report = ({
  report,
  error,
  loading,
}: ReportProps): JSX.Element => {
  if (error) {
    return (
      <div className="pb-4">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (loading || report == null) {
    return (
      <div className="pb-4">
        <p className="text-center">Kraunama...</p>
      </div>
    );
  }

  const reportType =
    reportTypeTranslations[reportTypeToId[report.reportType ?? 'Custom']];

  const { date: dateFrom } = formatDate(report.dateFrom);
  const { date: dateTo } = formatDate(report.dateTo);
  const { date: generationDate } = formatDate(report.generationDate);

  return (
    <div>
      <p>
        <span className="font-bold">Ataskaitos kodas:</span> {report.code}
      </p>
      <p>
        <span className="font-bold">Nuo:</span> {dateFrom}
      </p>
      <p>
        <span className="font-bold">Iki:</span> {dateTo}
      </p>
      <p>
        <span className="font-bold">Sugeneruota:</span> {generationDate}
      </p>
      <p>
        <span className="font-bold">Iš viso užsakymų:</span> {report.orderCount}
      </p>
      <p>
        <span className="font-bold">Vaistinė:</span> {report.pharmacy}
      </p>
      <p>
        <span className="font-bold">Pelnas:</span> {formatMoney(report.profit)}
      </p>
      <p>
        <span className="font-bold">Ataskaitos tipas:</span> {reportType}
      </p>
      <p>
        <span className="font-bold">Pelnas grynais pinigais:</span>{' '}
        {formatMoney(report.revenueInCash)}
      </p>
      <p>
        <span className="font-bold">Išlaidos:</span>{' '}
        {formatMoney(report.totalOrderAmount)}
      </p>
      <p>
        <span className="font-bold">Pajamos:</span>{' '}
        {formatMoney(report.totalRevenue)}
      </p>
      <p>
        <span className="font-bold">Pirkimų skaičius:</span>{' '}
        {report.transactionCount}
      </p>
      <p>
        <span className="font-bold">Sugeneravo vartotojas:</span> {report.user}
      </p>
    </div>
  );
};
