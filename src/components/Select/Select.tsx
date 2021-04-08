type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  className,
  children,
  ...props
}: SelectProps): JSX.Element => {
  return (
    <select
      className={`block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
