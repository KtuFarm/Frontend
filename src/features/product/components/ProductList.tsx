import { ProductBalanceDTO } from 'swagger/models';

import { formatDate } from 'utils/date';

interface ProductListProps {
  products: ProductBalanceDTO[];
  error: string;
  loading: boolean;
}

export const ProductList = ({
  products,
  error,
  loading,
}: ProductListProps): JSX.Element => {
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

  if (products.length === 0) {
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
          <th className="px-4 py-3">Kaina</th>
          <th className="px-4 py-3">Likutis</th>
          <th className="px-4 py-3">Galiojimo laikas</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          const { id, medicamentName, price, amount } = product;
          const { date: expirationDate } = formatDate(product.expirationDate);

          return (
            <tr key={id}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{medicamentName}</td>
              <td className="px-4 py-3">{price?.toFixed(2)}€</td>
              <td className="px-4 py-3">{amount}</td>
              <td className="px-4 py-3">{expirationDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
