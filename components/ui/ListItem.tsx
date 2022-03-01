import { cx } from '../../util/helpers/classNames.helpers';

type ListItemProps = {
  children: string | JSX.Element;
};

const ListItem = ({ children }: ListItemProps) => {
  const classNames = cx(
    'border-b px-4 py-2 hover:bg-neutral-100 last:border-b-0 first:md:rounded-t last:md:rounded-b'
  );

  return <li className={classNames}>{children}</li>;
};

export default ListItem;
