import { BiCheckCircle, BiError, BiErrorCircle, BiInfoCircle } from 'react-icons/bi';

type AlertProps = {
  message: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
};

const icons = {
  success: <BiCheckCircle />,
  warning: <BiError />,
  danger: <BiErrorCircle />,
  info: <BiInfoCircle />,
};

const Alert = ({ message, type }: AlertProps) => {
  const styles = ['flex items-center', 'my-1', 'px-4', 'py-2', 'rounded', 'shadow', 'border'];

  let icon = null;

  switch (type) {
    case 'success':
      styles.push('bg-green-200');
      styles.push('text-green-700');
      icon = icons.success;
      break;
    case 'warning':
      styles.push('bg-orange-200');
      styles.push('text-orange-700');
      icon = icons.warning;
      break;
    case 'danger':
      styles.push('bg-red-200');
      styles.push('text-red-700');
      icon = icons.danger;
      break;
    case 'info':
      styles.push('bg-blue-200');
      styles.push('text-blue-700');
      icon = icons.info;
      break;

    default:
      styles.push('bg-white');
      styles.push('text-black');
      break;
  }

  const classNames = styles.join(' ');

  return (
    <div className={classNames}>
      {icon && <span className="mr-2 inline-flex">{icon}</span>}
      {message}
    </div>
  );
};

export default Alert;
