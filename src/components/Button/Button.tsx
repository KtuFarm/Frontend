type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Primary = ({
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Danger = ({
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Secondary = ({
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
