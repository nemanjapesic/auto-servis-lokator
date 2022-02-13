type HeadingProps = {
  children: string;
  uppercase?: boolean;
};

const Heading = ({ children, uppercase }: HeadingProps) => {
  const styles = ['py-4', 'text-xl', 'font-bold', 'text-center'];

  if (uppercase) styles.push('uppercase');

  const classNames = styles.join(' ');

  return <h1 className={classNames}>{children}</h1>;
};

export default Heading;
