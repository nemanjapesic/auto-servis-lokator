import { User } from 'firebase/auth';

type AvatarProps = {
  user: User;
  large?: boolean;
};

const Avatar = ({ user, large = false }: AvatarProps) => {
  return (
    <div
      className={`${
        large ? 'h-16 w-16 border-blue-500' : 'h-12 w-12 border-white'
      } flex items-center justify-center rounded-full border-2 text-2xl font-bold text-white`}
    >
      {user.photoURL ? (
        <img className="rounded-full" src={user.photoURL} alt={user.displayName} />
      ) : (
        <span className={`${large ? 'text-blue-500' : 'text-white'}`}>{user.displayName[0]}</span>
      )}
    </div>
  );
};

export default Avatar;
