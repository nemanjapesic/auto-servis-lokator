import { cx } from '../../util/helpers/classNames.helpers';

type SelectProps = {
  children: JSX.Element[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

const Select = ({
  children,
  value,
  onChange,
  name,
  label,
  placeholder,
  fullWidth,
}: SelectProps) => {
  const classNames = cx('my-1 rounded border px-4 py-3 shadow', fullWidth && 'w-full');

  return (
    <div className="relative my-2">
      <select className={classNames} value={value} onChange={onChange} name={name}>
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
    </div>
  );
};

export default Select;
