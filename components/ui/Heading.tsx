type HeadingProps = {
  children: string;
  light?: boolean;
  uppercase?: boolean;
};

const Heading = ({ children, light, uppercase }: HeadingProps) => {
  const styles = ['py-4', 'text-xl', 'font-bold', 'text-center'];

  if (light) styles.push('text-white');
  if (uppercase) styles.push('uppercase');

  const classNames = styles.join(' ');

  return <h1 className={classNames}>{children}</h1>;
};

export default Heading;
