import Header from './Header';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="mt-16 flex flex-1">{children}</div>
    </div>
  );
};

export default Layout;
