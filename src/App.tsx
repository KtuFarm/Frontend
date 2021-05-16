import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from 'features/home';
import { Login } from 'features/login';
import {
  CreateMedicament,
  EditMedicament,
  Medicaments,
} from 'features/medicament';
import { CreateOrder, EditOrder, Orders } from 'features/order';
import { CreatePharmacy, EditPharmacy, Pharmacies } from 'features/pharmacy';
import { Products } from 'features/product';
import { CreateReport, Reports, ViewReport } from 'features/reports';
import { CreateSale, Sales } from 'features/sale';
import { useAuth } from 'hooks/useAuth';

import { Loader } from 'components/Loader';

export const App = (): JSX.Element => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen text-indigo-600">
        <Loader />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pharmacy" element={<Pharmacies />} />
      <Route path="/pharmacy/new" element={<CreatePharmacy />} />
      <Route path="/pharmacy/:id" element={<EditPharmacy />} />
      <Route path="/medicament" element={<Medicaments />} />
      <Route path="/medicament/new" element={<CreateMedicament />} />
      <Route path="/medicament/:id" element={<EditMedicament />} />
      <Route path="/sale" element={<Sales />} />
      <Route path="/sale/new" element={<CreateSale />} />
      <Route path="/order" element={<Orders />} />
      <Route path="/order/new" element={<CreateOrder />} />
      <Route path="/order/:id" element={<EditOrder />} />
      <Route path="/product" element={<Products />} />
      <Route path="/report" element={<Reports />} />
      <Route path="/report/new" element={<CreateReport />} />
      <Route path="/report/:id" element={<ViewReport />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
