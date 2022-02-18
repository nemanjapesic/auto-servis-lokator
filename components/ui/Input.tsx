type InputProps = {
  name: string;
  register: any;
  label?: string;
  placeholder?: string;
  validationRules?: any;
  error?: any;
  type?: string;
  fullWidth?: boolean;
};

const Input = ({
  name,
  register,
  label,
  placeholder,
  validationRules,
  error,
  type,
  fullWidth,
}: InputProps) => {
  const styles = ['peer', 'my-1', 'px-4', 'py-2', 'rounded', 'shadow', 'border'];

  if (fullWidth) styles.push('w-full');
  if (error) styles.push('border-red-500');

  const classNames = styles.join(' ');

  return (
    <div className="relative my-2">
      <input
        className={classNames}
        type={type}
        {...register(name, validationRules)}
        placeholder={placeholder}
      />
      <label
        htmlFor={name}
        className="absolute -top-1.5 left-2 bg-white px-1 text-sm opacity-100 transition-all peer-placeholder-shown:opacity-0"
      >
        {label}
      </label>
      <p className="text-xs leading-3 text-red-500">{error?.message}&nbsp;</p>
    </div>
  );
};

export default Input;
