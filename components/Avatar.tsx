import { ProviderId } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { User } from '../typescript/user.interfaces';
import { cx } from '../util/helpers/classNames.helpers';

type AvatarProps = {
  user: User;
  large?: boolean;
};

const Avatar = ({ user, large = false }: AvatarProps) => {
  const { fbAccessToken } = useAuth();

  let profilePictureUrl = user.photoURL;

  if (user.providerId === ProviderId.FACEBOOK) {
    profilePictureUrl += `?access_token=${fbAccessToken}`;
  }

  return (
    <div
      className={cx(
        'flex items-center justify-center rounded-full border-4 text-2xl font-bold text-white',
        large
          ? 'h-16 w-16 border-blue-500 bg-blue-500 text-4xl'
          : 'h-12 w-12 border-white border-opacity-10 hover:border-white hover:border-opacity-25'
      )}
    >
      {user.photoURL ? (
        <img
          className="w-16 rounded-full"
          src={profilePictureUrl}
          alt={user.displayName}
          width="64px"
          height="64px"
        />
      ) : (
        <span className="text-white">{user.displayName[0]}</span>
      )}
    </div>
  );
};

export default Avatar;
