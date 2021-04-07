import { MedicamentDTO } from 'swagger/models';

import { calculateTotalPrice } from '../utils/calculateTotalPrice';

interface MedicamentListProps {
  medicaments: MedicamentDTO[];
  error: string;
  loading: boolean;
}

export const MedicamentList = ({
  medicaments,
  error,
  loading,
}: MedicamentListProps): JSX.Element => {
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

  if (medicaments.length === 0) {
    return (
      <div className="pb-4">
        <p className="text-center">Nėra vaistų</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left whitespace-no-wrap table-auto table-stripped">
      <thead>
        <tr className="text-sm font-medium tracking-wider text-gray-900 border-b-2 border-gray-400 title-font">
          <th className="px-4 py-3">#</th>
          <th className="px-4 py-3">Vaistas</th>
          <th className="px-4 py-3">Veiklioji medžiaga</th>
          <th className="px-4 py-3">Kaina</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {medicaments.map((medicament, index) => {
          const {
            medicamentNo,
            name,
            activeSubstance,
            basePrice,
            surcharge,
          } = medicament;

          const totalPrice =
            basePrice !== undefined && surcharge !== undefined
              ? `${calculateTotalPrice(basePrice, surcharge).toFixed(2)}€`
              : '-';

          return (
            <tr key={medicamentNo}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{name}</td>
              <td className="px-4 py-3">{activeSubstance}</td>
              <td className="px-4 py-3">{totalPrice}</td>
              <td className="px-4 py-3 text-right">
                <button
                  className="mr-4 text-indigo-500 outline-none appearance-none hover:underline hover:text-indigo-600 focus:outline-none"
                  type="button"
                >
                  Redaguoti
                </button>
                <button
                  className="text-red-500 outline-none appearance-none hover:underline hover:text-red-600 focus:outline-none"
                  type="button"
                >
                  Pašalinti
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
