import NextLink from 'next/link';

type LinkProps = {
  children: string;
  href: string;
  underline?: boolean;
};

const Link = ({ children, href, underline }: LinkProps) => {
  const styles = [''];

  if (underline) styles.push('underline');

  const classNames = styles.join(' ');

  return (
    <NextLink href={href}>
      <a className={classNames}>{children}</a>
    </NextLink>
  );
};

export default Link;
