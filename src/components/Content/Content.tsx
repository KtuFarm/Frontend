import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
  withPadding?: boolean;
}

export const Content = ({
  children,
  withPadding = true,
}: ContentProps): JSX.Element => {
  return (
    <div
      className={`container mx-auto mt-16 bg-white rounded shadow ${
        withPadding ? 'p-8' : ''
      }`}
    >
      {children}
    </div>
  );
};
