import Header from './Header';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
