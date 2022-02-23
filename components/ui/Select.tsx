import { cx } from '../../util/helpers/classNames.helpers';

type SelectProps = {
  children: JSX.Element[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

const Select = ({ children, value, onChange, label, placeholder, fullWidth }: SelectProps) => {
  const classNames = cx('my-1 rounded border px-4 py-2 shadow', fullWidth && 'w-full');

  return (
    <div className="my-2">
      <label>
        <p>{label}</p>
        <select className={classNames} value={value} onChange={onChange}>
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
      </label>
    </div>
  );
};

export default Select;
