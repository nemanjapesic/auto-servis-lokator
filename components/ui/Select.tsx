type SelectProps = {
  children: JSX.Element[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

const Select = ({ children, value, onChange, label, placeholder, fullWidth }: SelectProps) => {
  const styles = ['my-1', 'px-4', 'py-2', 'rounded', 'shadow', 'border'];

  if (fullWidth) styles.push('w-full');

  const classNames = styles.join(' ');

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
