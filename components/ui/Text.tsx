import { cx } from '../../util/helpers/classNames.helpers';

type TextProps = {
  children: string | JSX.Element | (string | JSX.Element)[];
  light?: boolean;
  small?: boolean;
  large?: boolean;
  center?: boolean;
  bold?: boolean;
  uppercase?: boolean;
};

const Text = ({ children, light, small, large, center, bold, uppercase }: TextProps) => {
  const classNames = cx(
    'my-1',
    light && 'text-white',
    small && 'text-sm',
    large && 'text-lg',
    center && 'text-center',
    bold && 'font-bold',
    uppercase && 'uppercase'
  );

  return <p className={classNames}>{children}</p>;
};

export default Text;
