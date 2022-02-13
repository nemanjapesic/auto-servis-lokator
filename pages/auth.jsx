import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaFacebookF, FaGoogle, FaSignOutAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { currentUser, signInWithFacebook, signInWithGoogle, signOut } = useAuth();
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  const router = useRouter();

  const handleFacebookSignIn = async () => {
    try {
      setIsAuthInProgress(true);
      await signInWithFacebook();
      router.push('/');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setTimeout(() => {
          alert('Email already exists. Please Sign In with Google');
        }, 0);
      }
    } finally {
      setIsAuthInProgress(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthInProgress(true);
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthInProgress(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-64 mx-auto">
      <Heading uppercase>{currentUser ? 'Sign Out' : 'Sign In'}</Heading>
      {currentUser ? (
        <Button fullWidth icon={<FaSignOutAlt />} onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <>
          <Button
            fullWidth
            icon={<FaFacebookF />}
            onClick={handleFacebookSignIn}
            disabled={isAuthInProgress}
          >
            Sign In with Facebook
          </Button>
          <Button
            fullWidth
            light
            icon={<FaGoogle />}
            onClick={handleGoogleSignIn}
            disabled={isAuthInProgress}
          >
            Sign In with Google
          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;
