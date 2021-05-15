import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as authService from 'features/login/services/AuthService';
import { UserDTO } from 'swagger/models';

import { Department } from 'utils/departments';
import { storage } from 'utils/storage';

interface AuthState {
  isLoggedIn: boolean;
  user: UserDTO | null;
  department: Department;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  department: Department.None,
  loading: true,
  error: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearError() {},
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  return useContext(AuthContext);
};

const useProvideAuth = (): AuthState => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [department, setDepartment] = useState<Department>(Department.None);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string): Promise<void> => {
    if (email === '' || password === '') {
      setError('Neužpildyti visi laukeliai');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const { jwt } = (await response.json()) ?? { jwt: '' };

      if (!jwt) {
        setError('Nepavyko prisijungti');
        return;
      }

      storage.set('token', jwt);
      await me(jwt);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  const me = async (token: string): Promise<void> => {
    if (!token) {
      setError('Nepavyko prisijungti');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.me(token);
      const data = await response.json();

      const newUser: UserDTO = data?.data;

      if (!newUser) {
        setError('Nepavyko prisijungti');
        return;
      }

      const newDepartment = newUser.department as Department;

      setUser(newUser);
      setDepartment(newDepartment);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setDepartment(Department.None);
    setLoading(false);
    setError('');
    storage.remove('token');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token') ?? '';
    me(token);
  }, []);

  const isLoggedIn = user != null;

  const clearError = (): void => setError('');

  return {
    isLoggedIn,
    user,
    department,
    loading,
    error,
    login,
    logout,
    clearError,
  };
};
