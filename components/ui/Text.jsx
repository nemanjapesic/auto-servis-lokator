const Text = ({ children, small, large, bold, light, center, uppercase }) => {
  const styles = [];

  if (small) styles.push('text-sm');
  if (large) styles.push('text-lg');
  if (bold) styles.push('font-bold');
  if (light) styles.push('text-white');
  if (uppercase) styles.push('uppercase');
  if (center) styles.push('text-center');

  const classNames = styles.join(' ');

  return <p className={classNames}>{children}</p>;
};

export default Text;
