import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useClickOutside from '../hooks/useClickOutside';
import AvatarMenuIconButton from './AvatarMenuIconButton';
import Brand from './Brand';
import MenuIconButton from './MenuIconButton';
import Nav from './Nav';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const menuIconRef = useRef(null);

  const onClickOutside = () => {
    setMenuOpen(false);
  };

  useClickOutside(menuIconRef, onClickOutside);

  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  return (
    <header className="relative">
      <div className="relative z-10 flex flex-initial justify-between bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2 shadow">
        <Brand />
        {currentUser ? (
          <AvatarMenuIconButton user={currentUser} onClick={toggleMenu} menuIconRef={menuIconRef} />
        ) : (
          <MenuIconButton open={menuOpen} onClick={toggleMenu} menuIconRef={menuIconRef} />
        )}
      </div>
      <Nav open={menuOpen} />
    </header>
  );
};

export default Header;
