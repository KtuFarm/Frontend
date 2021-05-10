import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'hooks/useAuth';

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { clearError, login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    clearError();
  }, [clearError, email, password]);

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <section className="h-screen text-gray-600 bg-white body-font">
      <div className="container flex flex-wrap items-center px-5 py-24 mx-auto">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full p-8 mx-auto mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mt-0"
        >
          <h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
            Prisijungimas
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="text-sm leading-7 text-gray-600">
              El. paštas
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="text-sm leading-7 text-gray-600"
            >
              Slaptažodis
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
          >
            Prisijungti
          </button>

          {error !== '' ? (
            <p className="mt-3 text-xs text-red-700">{error}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
};
