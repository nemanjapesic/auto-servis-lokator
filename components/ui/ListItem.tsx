import { cx } from '../../util/helpers/classNames.helpers';

type ListItemProps = {
  children: string | JSX.Element;
};

const ListItem = ({ children }: ListItemProps) => {
  const classNames = cx('border-b px-4 py-2');

  return <li className={classNames}>{children}</li>;
};

export default ListItem;
