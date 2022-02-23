import { ProviderId, User } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

type AvatarProps = {
  user: User;
  large?: boolean;
};

const Avatar = ({ user, large = false }: AvatarProps) => {
  const { providerId, fbAccessToken } = useAuth();

  let profilePictureUrl = user.photoURL;

  if (providerId === ProviderId.FACEBOOK) {
    profilePictureUrl += `?access_token=${fbAccessToken}`;
  }

  return (
    <div
      className={`${
        large ? 'h-16 w-16 border-blue-500' : 'h-12 w-12 border-white'
      } flex items-center justify-center rounded-full border-2 text-2xl font-bold text-white`}
    >
      {user.photoURL ? (
        <img className="w-16 rounded-full" src={profilePictureUrl} alt={user.displayName} />
      ) : (
        <span className={`${large ? 'text-blue-500' : 'text-white'}`}>{user.displayName[0]}</span>
      )}
    </div>
  );
};

export default Avatar;
