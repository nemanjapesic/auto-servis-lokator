import { cx } from '../../util/helpers/classNames.helpers';

type HeadingProps = {
  children: string | JSX.Element | (string | JSX.Element)[];
  light?: boolean;
  uppercase?: boolean;
};

const Heading = ({ children, light, uppercase }: HeadingProps) => {
  const classNames = cx(
    'py-4 text-center text-xl font-bold',
    light && 'text-white',
    uppercase && 'uppercase'
  );

  return <h1 className={classNames}>{children}</h1>;
};

export default Heading;
