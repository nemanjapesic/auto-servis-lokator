import NextLink from 'next/link';
import { cx } from '../../util/helpers/classNames.helpers';

type LinkProps = {
  children: string | JSX.Element;
  href: string;
  fullWidth?: boolean;
  underline?: boolean;
};

const Link = ({ children, href, fullWidth, underline }: LinkProps) => {
  const classNames = cx('inline-block', fullWidth && 'w-full', underline && 'underline');

  return (
    <NextLink href={href}>
      <a className={classNames}>{children}</a>
    </NextLink>
  );
};

export default Link;
