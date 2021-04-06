import { Route, Routes } from 'react-router-dom';
import { Home } from 'features/home';
import { Login } from 'features/login';
import { CreatePharmacy, Pharmacies } from 'features/pharmacy';

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pharmacy" element={<Pharmacies />} />
      <Route path="/pharmacy/new" element={<CreatePharmacy />} />
    </Routes>
  );
};
