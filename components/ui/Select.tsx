import { cx } from '../../util/helpers/classNames.helpers';

type SelectProps = {
  children: JSX.Element[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  register?: any;
  validationRules?: any;
  error?: any;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

const Select = ({
  children,
  value,
  onChange,
  name,
  register,
  validationRules,
  error,
  label,
  placeholder,
  fullWidth,
}: SelectProps) => {
  const classNames = cx(
    'my-1 rounded border px-4 py-3 shadow',
    fullWidth && 'w-full',
    error && 'border-red-500',
    !value && 'text-gray-400 focus:text-black'
  );

  const registerProps = register ? { ...register(name, validationRules), defaultValue: '' } : {};

  return (
    <div
      className={cx(
        'relative my-2',
        validationRules?.required &&
          "after:absolute after:top-0 after:right-0 after:mr-1 after:mt-1 after:text-red-500 after:content-['*']"
      )}
    >
      <select
        className={classNames}
        value={value}
        onChange={onChange}
        name={name}
        {...registerProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
      <label
        htmlFor={name}
        className="absolute -top-1.5 left-2 bg-white px-1 text-sm opacity-100 transition-all"
      >
        {value && label}
      </label>
      {error && <p className="text-xs leading-3 text-red-500">{error?.message}</p>}
    </div>
  );
};

export default Select;
