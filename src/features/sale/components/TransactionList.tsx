import { TransactionDTO } from 'swagger/models';

import { formatDate } from 'utils/date';
import { formatMoney } from 'utils/money';

interface PharmacyListProps {
  transactions: TransactionDTO[];
  error: string;
  loading: boolean;
}

export const TransactionList = ({
  transactions,
  error,
  loading,
}: PharmacyListProps): JSX.Element => {
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

  if (transactions.length === 0) {
    return (
      <div className="pb-4">
        <p className="text-center">Nėra transakcijų</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left whitespace-no-wrap table-auto table-stripped">
      <thead>
        <tr className="text-sm font-medium tracking-wider text-gray-900 border-b-2 border-gray-400 title-font">
          <th className="px-4 py-3">#</th>
          <th className="px-4 py-3">Sukurta</th>
          <th className="px-4 py-3">Kaina</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          const { date, time } = formatDate(transaction.createdAt);
          const price = formatMoney(transaction.totalPrice);

          return (
            <tr key={index}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                {date} {time}
              </td>
              <td className="px-4 py-3">{price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
