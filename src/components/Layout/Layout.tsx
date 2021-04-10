import { ReactNode } from 'react';

import { Header } from 'components/Header';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export const Layout = ({ title, children }: LayoutProps): JSX.Element => {
  return (
    <div className="h-full min-h-screen pb-8 bg-gray-100">
      <Header />
      <section className="relative px-6 text-gray-600 body-font">
        <div className="container p-8 mx-auto mt-16 bg-white rounded shadow">
          {title != null && title !== '' ? (
            <div className="flex flex-col w-full mb-6">
              <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
                {title}
              </h1>
            </div>
          ) : null}
          {children}
        </div>
      </section>
    </div>
  );
};
