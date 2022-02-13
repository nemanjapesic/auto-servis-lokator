type ListItemProps = {
  children: string | JSX.Element;
};

const ListItem = ({ children }: ListItemProps) => {
  const styles = ['px-4', 'py-2', 'border-b'];

  const classNames = styles.join(' ');

  return <li className={classNames}>{children}</li>;
};

export default ListItem;