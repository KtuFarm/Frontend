import { Route, Routes } from 'react-router-dom';
import { Home } from 'features/home';
import { Login } from 'features/login';
import {
  CreateMedicament,
  EditMedicament,
  Medicaments,
} from 'features/medicament';
import { CreatePharmacy, EditPharmacy, Pharmacies } from 'features/pharmacy';
import { CreateSale } from 'features/sale';

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pharmacy" element={<Pharmacies />} />
      <Route path="/pharmacy/new" element={<CreatePharmacy />} />
      <Route path="/pharmacy/:id" element={<EditPharmacy />} />
      <Route path="/medicament" element={<Medicaments />} />
      <Route path="/medicament/new" element={<CreateMedicament />} />
      <Route path="/medicament/:id" element={<EditMedicament />} />
      <Route path="/sale/new" element={<CreateSale />} />
    </Routes>
  );
};
