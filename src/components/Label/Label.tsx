type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({
  children,
  className,
  ...props
}: LabelProps): JSX.Element => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
