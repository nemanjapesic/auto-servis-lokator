import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { currentUser, signInWithFacebook, signInWithGoogle, signOut } = useAuth();

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setTimeout(() => {
          alert('Email already exists. Please Sign In with Google');
        }, 0);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-2 text-center text-3xl font-bold">Hello {currentUser?.displayName}</h1>
      <button className="w-48 m-1 p-2 border" onClick={handleFacebookSignIn}>
        Sign In with Facebook
      </button>
      <button className="w-48 m-1 p-2 border" onClick={handleGoogleSignIn}>
        Sign In with Google
      </button>
      <button className="w-48 m-1 p-2 border" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Auth;
