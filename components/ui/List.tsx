import { cx } from '../../util/helpers/classNames.helpers';

type ListProps = {
  children: JSX.Element | JSX.Element[];
};

const List = ({ children }: ListProps) => {
  const classNames = cx('bg-white shadow md:rounded');

  return <ul className={classNames}>{children}</ul>;
};

export default List;
