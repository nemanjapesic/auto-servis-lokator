type ListProps = {
  children: JSX.Element | JSX.Element[];
};

const List = ({ children }: ListProps) => {
  const styles = ['bg-white', 'shadow'];

  const classNames = styles.join(' ');

  return <ul className={classNames}>{children}</ul>;
};

export default List;
