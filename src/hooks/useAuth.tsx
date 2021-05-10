import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as authService from 'features/login/services/AuthService';
import { UserDTO } from 'swagger/models';

interface AuthState {
  isLoggedIn: boolean;
  user: UserDTO | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
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

      sessionStorage.setItem('token', jwt);
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

      setUser(newUser);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    sessionStorage.removeItem('token');
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
    loading,
    error,
    login,
    logout,
    clearError,
  };
};
