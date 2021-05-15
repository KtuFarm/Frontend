import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from 'features/home';
import { Login } from 'features/login';
import {
  CreateMedicament,
  EditMedicament,
  Medicaments,
} from 'features/medicament';
import { CreateOrder, Orders } from 'features/order';
import { CreatePharmacy, EditPharmacy, Pharmacies } from 'features/pharmacy';
import { CreateSale, Sales } from 'features/sale';
import { useAuth } from 'hooks/useAuth';

export const App = (): JSX.Element => {
  const { isLoggedIn } = useAuth();

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
