const Select = ({ children, value, label, placeholder, fullWidth, onChange }) => {
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
