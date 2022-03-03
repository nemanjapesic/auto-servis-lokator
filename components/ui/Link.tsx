import NextLink from 'next/link';
import { cx } from '../../util/helpers/classNames.helpers';

type LinkProps = {
  children: string | JSX.Element;
  href: string;
  fullWidth?: boolean;
  underline?: boolean;
  padded?: boolean;
};

const Link = ({ children, href, fullWidth, underline, padded }: LinkProps) => {
  const classNames = cx(
    'inline-block',
    fullWidth && 'w-full',
    underline && 'underline',
    padded && 'px-4 py-2'
  );

  return (
    <NextLink href={href}>
      <a className={classNames}>{children}</a>
    </NextLink>
  );
};

export default Link;
