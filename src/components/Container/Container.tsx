import { ReactNode } from 'react';

import { Header } from 'components/Header';

interface ContainerProps {
  children: ReactNode;
  withHeader?: boolean;
}

export const Container = ({
  children,
  withHeader = true,
}: ContainerProps): JSX.Element => {
  return (
    <div className="h-full min-h-screen pb-8 bg-gray-100">
      {withHeader ? <Header /> : null}
      <section className="relative px-6 text-gray-600 body-font">
        {children}
      </section>
    </div>
  );
};
