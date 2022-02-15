import NextLink from 'next/link';

type LinkProps = {
  children: string | JSX.Element;
  href: string;
  fullWidth?: boolean;
  underline?: boolean;
};

const Link = ({ children, href, fullWidth, underline }: LinkProps) => {
  const styles = ['inline-block'];

  if (fullWidth) styles.push('w-full');
  if (underline) styles.push('underline');

  const classNames = styles.join(' ');

  return (
    <NextLink href={href}>
      <a className={classNames}>{children}</a>
    </NextLink>
  );
};

export default Link;
