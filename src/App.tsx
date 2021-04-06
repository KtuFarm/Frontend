import { Route, Routes } from 'react-router-dom';
import { Home } from 'features/home';
import { Login } from 'features/login';
import { CreatePharmacy, PharmacyList } from 'features/pharmacy';

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pharmacy" element={<PharmacyList />} />
      <Route path="/pharmacy/new" element={<CreatePharmacy />} />
    </Routes>
  );
};
