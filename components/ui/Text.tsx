type TextProps = {
  children: string;
  light?: boolean;
  small?: boolean;
  large?: boolean;
  center?: boolean;
  bold?: boolean;
  uppercase?: boolean;
};

const Text = ({ children, light, small, large, center, bold, uppercase }: TextProps) => {
  const styles = [];

  if (light) styles.push('text-white');
  if (small) styles.push('text-sm');
  if (large) styles.push('text-lg');
  if (center) styles.push('text-center');
  if (bold) styles.push('font-bold');
  if (uppercase) styles.push('uppercase');

  const classNames = styles.join(' ');

  return <p className={classNames}>{children}</p>;
};

export default Text;
