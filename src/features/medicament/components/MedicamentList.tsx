import { MedicamentDTO } from 'swagger/models';

interface MedicamentListProps {
  medicaments: MedicamentDTO[];
  error: string;
  loading: boolean;
  onDelete: (medicamentId: number) => void;
}

export const MedicamentList = ({
  medicaments,
  error,
  loading,
  onDelete,
}: MedicamentListProps): JSX.Element => {
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
          <th className="px-4 py-3">Barkodas</th>
          <th className="px-4 py-3">Kaina</th>
          <th className="px-4 py-3">Reikalingas receptas</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {medicaments.map((medicament, index) => {
          const {
            id,
            name,
            activeSubstance,
            barCode,
            price,
            isPrescriptionRequired,
          } = medicament;

          return (
            <tr key={id}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-semibold">{name}</span>
                  <span className="text-sm">{activeSubstance}</span>
                </div>
              </td>
              <td className="px-4 py-3">{barCode}</td>
              <td className="px-4 py-3">{price?.toFixed(2)}€</td>
              <td className="px-4 py-3">
                {isPrescriptionRequired ? 'Taip' : ''}
              </td>
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
                  onClick={() => handleDelete(id)}
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
