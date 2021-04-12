type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  append?: string;
  prepend?: string;
};

export const Input = ({
  append,
  prepend,
  className,
  ...props
}: InputProps): JSX.Element => {
  const hasAppend = append != null && append !== '';
  const hasPrepend = prepend != null && prepend !== '';

  return (
    <div className="flex w-full mt-1 rounded-md shadow-sm">
      {hasAppend ? (
        <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
          {append}
        </span>
      ) : null}
      <input
        className={`z-10 flex-1 block w-full border-gray-300 rounded-md disabled:cursor-not-allowed disabled:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          hasAppend ? 'rounded-l-none' : ''
        } ${hasPrepend ? 'rounded-r-none' : ''} ${className ?? ''}`}
        {...props}
      />
      {hasPrepend ? (
        <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50">
          {prepend}
        </span>
      ) : null}
    </div>
  );
};
