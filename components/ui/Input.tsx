type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
};

const Input = ({
  type,
  name,
  value,
  onChange,
  label,
  placeholder,
  required,
  fullWidth,
}: InputProps) => {
  const styles = ['my-1', 'px-4', 'py-2', 'rounded', 'shadow', 'border'];

  if (fullWidth) styles.push('w-full');

  const classNames = styles.join(' ');

  return (
    <div className="my-2">
      <label>
        <p>{label}</p>
        <input
          className={classNames}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
