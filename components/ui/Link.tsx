import NextLink from 'next/link';

type LinkProps = {
  children: string;
  href: string;
};

const Link = ({ children, href }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;
