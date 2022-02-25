import { BiCheckCircle, BiError, BiErrorCircle, BiInfoCircle } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { cx } from '../../util/helpers/classNames.helpers';

type AlertProps = {
  message: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  onClose?: () => void;
};

const icons = {
  success: <BiCheckCircle />,
  warning: <BiError />,
  danger: <BiErrorCircle />,
  info: <BiInfoCircle />,
};

const getAlertVariant = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-200 text-green-700';
    case 'warning':
      return 'bg-orange-200 text-orange-700';
    case 'danger':
      return 'bg-red-200 text-red-700';
    case 'info':
      return 'bg-blue-200 text-blue-700';
    default:
      return 'bg-white text-black';
  }
};

const Alert = ({ message, type, onClose }: AlertProps) => {
  let icon = icons[type];

  const classNames = cx(
    'my-1 flex items-center rounded border px-4 py-2 shadow',
    getAlertVariant(type)
  );

  return (
    <div className={classNames}>
      <div className=""></div>

      {icon && <span className="mr-2">{icon}</span>}
      {message}
      <span className="ml-2 cursor-pointer" onClick={onClose}>
        <FaTimes />
      </span>
    </div>
  );
};

export default Alert;
