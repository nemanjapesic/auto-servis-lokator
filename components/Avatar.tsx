import { User } from 'firebase/auth';

type AvatarProps = {
  user: User;
  large?: boolean;
};

const Avatar = ({ user, large = false }: AvatarProps) => {
  return (
    <div
      className={`${
        large ? 'w-16 h-16' : 'w-12 h-12'
      }text-2xl text-white font-bold border-2 border-white rounded-full`}
    >
      {user.photoURL ? (
        <img className="rounded-full" src={user.photoURL} alt={user.displayName} />
      ) : (
        user.displayName[0]
      )}
    </div>
  );
};

export default Avatar;
