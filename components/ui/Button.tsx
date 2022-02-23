import { cx } from '../../util/helpers/classNames.helpers';

type ButtonProps = {
  children: string | JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  light?: boolean;
  fullWidth?: boolean;
  icon?: JSX.Element;
  bold?: boolean;
  uppercase?: boolean;
};

const Button = ({
  children,
  onClick,
  type,
  disabled,
  light,
  fullWidth,
  icon,
  bold,
  uppercase,
}: ButtonProps) => {
  const classNames = cx(
    'my-1 rounded border px-4 py-2 shadow',
    fullWidth && 'w-full',
    bold && 'font-bold',
    uppercase && 'uppercase',
    disabled
      ? 'cursor-not-allowed bg-gray-200 text-gray-400'
      : light
      ? 'bg-white text-black'
      : 'bg-gradient-to-b from-blue-500 to-blue-700 text-white'
  );

  return (
    <button className={classNames} onClick={onClick} type={type} disabled={disabled}>
      <span className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default Button;
