import { Link } from 'react-router-dom';
import { PharmacyDTO } from 'swagger/models';

interface PharmacyListProps {
  pharmacies: PharmacyDTO[];
  error: string;
  loading: boolean;
  onDelete: (pharmacyId: number) => void;
}

export const PharmacyList = ({
  pharmacies,
  error,
  loading,
  onDelete,
}: PharmacyListProps): JSX.Element => {
  const handleDelete = (pharmacyId: number | undefined): void => {
    if (pharmacyId) onDelete(pharmacyId);
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

  if (pharmacies.length === 0) {
    return (
      <div className="pb-4">
        <p className="text-center">Nėra vaistinių</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left whitespace-no-wrap table-auto table-stripped">
      <thead>
        <tr className="text-sm font-medium tracking-wider text-gray-900 border-b-2 border-gray-400 title-font">
          <th className="px-4 py-3">#</th>
          <th className="px-4 py-3">Filialo nr.</th>
          <th className="px-4 py-3">Adresas</th>
          <th className="px-4 py-3">Miestas</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {pharmacies.map((pharmacy, index) => (
          <tr key={pharmacy.pharmacyNo}>
            <td className="px-4 py-3">{index + 1}</td>
            <td className="px-4 py-3">{pharmacy.pharmacyNo}</td>
            <td className="px-4 py-3">{pharmacy.address}</td>
            <td className="px-4 py-3">{pharmacy.city}</td>
            <td className="px-4 py-3 text-right">
              <Link
                className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                to={`/pharmacy/${pharmacy.pharmacyNo}`}
              >
                Redaguoti
              </Link>
              <button
                className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                type="button"
                onClick={() => handleDelete(pharmacy.pharmacyNo)}
              >
                Pašalinti
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
