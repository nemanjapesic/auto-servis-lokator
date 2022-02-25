import { User } from '../typescript/user.interfaces';
import Avatar from './Avatar';

type AvatarMenuIconButtonProps = {
  onClick: () => void;
  menuIconRef: React.MutableRefObject<HTMLButtonElement>;
  user: User;
};

const AvatarMenuIconButton = ({ onClick, menuIconRef, user }: AvatarMenuIconButtonProps) => {
  return (
    <button onClick={onClick} ref={menuIconRef}>
      <Avatar user={user} />
    </button>
  );
};

export default AvatarMenuIconButton;
