const List = ({ children }) => {
  const styles = ['shadow'];

  const classNames = styles.join(' ');

  return <ul className={classNames}>{children}</ul>;
};

export default List;
