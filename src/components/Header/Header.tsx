import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const Header = (): JSX.Element => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenMedicaments = (): void => {
    navigate('/medicament');
  };

  const handleOpenPharmacies = (): void => {
    navigate('/pharmacy');
  };

  const handleOpenSales = (): void => {
    navigate('/sale');
  };

  const handleCreateSale = (): void => {
    navigate('/sale/new');
  };

  const handleOpenOrders = (): void => {
    navigate('/order');
  };

  return (
    <header className="text-gray-600 bg-white shadow body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link
          to="/"
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
        >
          <span className="ml-3 text-xl">Vaistukai</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <button
            onClick={handleOpenMedicaments}
            className="mr-5 hover:text-gray-900"
          >
            Vaistai
          </button>
          <button
            onClick={handleOpenPharmacies}
            className="mr-5 hover:text-gray-900"
          >
            Vaistinės
          </button>
          <button
            onClick={handleOpenSales}
            className="mr-5 hover:text-gray-900"
          >
            Pardavimai
          </button>
          <button
            onClick={handleCreateSale}
            className="mr-5 hover:text-gray-900"
          >
            Naujas pardavimas
          </button>
          <button
            onClick={handleOpenOrders}
            className="mr-5 hover:text-gray-900"
          >
            Užsakymai
          </button>
        </nav>
        <button
          onClick={() => logout()}
          className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0"
        >
          Atsijungti
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
