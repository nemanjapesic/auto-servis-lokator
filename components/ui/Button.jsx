const Button = ({ children, onClick, light, fullWidth, bold, uppercase, disabled, icon }) => {
  const styles = ['my-1', 'px-4', 'py-2', 'rounded', 'shadow', 'border'];

  const textColor = light ? 'text-black' : 'text-white';
  const bgColor = light ? 'bg-white' : 'bg-gradient-to-b from-blue-500 to-blue-700';
  if (disabled) {
    styles.push('bg-gray-200', 'text-gray-400');
  } else {
    styles.push(bgColor, textColor);
  }
  if (fullWidth) styles.push('w-full');
  if (bold) styles.push('font-bold');
  if (uppercase) styles.push('uppercase');

  const classNames = styles.join(' ');

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      <span className="flex justify-center items-center">
        {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default Button;
