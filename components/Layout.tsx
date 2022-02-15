import Header from './Header';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
