type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Radio = ({ className, ...props }: RadioProps): JSX.Element => {
  return (
    <input
      type="radio"
      className={`w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
};
