import { HiDotsVertical } from 'react-icons/hi';

type MenuIconButtonProps = {
  open: boolean;
  onClick: () => void;
  menuIconRef: React.MutableRefObject<HTMLButtonElement>;
};

const MenuIconButton = ({ open, onClick, menuIconRef }: MenuIconButtonProps) => {
  return (
    <button className="text-3xl text-white" onClick={onClick} ref={menuIconRef} aria-label="menu">
      <HiDotsVertical className={`transition duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
};

export default MenuIconButton;
