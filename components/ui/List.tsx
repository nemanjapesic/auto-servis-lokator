type ListProps = {
  children: JSX.Element[];
};

const List = ({ children }: ListProps) => {
  const styles = ['shadow'];

  const classNames = styles.join(' ');

  return <ul className={classNames}>{children}</ul>;
};

export default List;
