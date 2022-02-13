const Input = ({ label, type, name, value, placeholder, fullWidth, onChange }) => {
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
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
