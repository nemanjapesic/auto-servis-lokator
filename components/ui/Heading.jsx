const Heading = ({ children, uppercase }) => {
  const styles = ['py-4', 'text-xl', 'font-bold', 'text-center'];

  if (uppercase) styles.push('uppercase');

  const classNames = styles.join(' ');

  return <h1 className={classNames}>{children}</h1>;
};

export default Heading;
