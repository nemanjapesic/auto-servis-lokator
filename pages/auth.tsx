import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { isLoading, currentUser, signInWithFacebook, signInWithGoogle } = useAuth();
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [alert, setAlert] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push('/');
    }
  }, [isLoading, currentUser]);

  const handleFacebookSignIn = async () => {
    try {
      setIsAuthInProgress(true);
      await signInWithFacebook();
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setAlert({ type: 'info', message: 'Email already exists. Please Sign In with Google' });
      }
    } finally {
      setIsAuthInProgress(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthInProgress(true);
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthInProgress(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="mx-auto flex flex-col items-center">
      <Heading uppercase>Prijavi se</Heading>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div>
        <Button
          fullWidth
          light
          icon={<FaGoogle />}
          onClick={handleGoogleSignIn}
          disabled={isAuthInProgress}
        >
          Google
        </Button>
        <Button
          fullWidth
          icon={<FaFacebookF />}
          onClick={handleFacebookSignIn}
          disabled={isAuthInProgress}
        >
          Facebook
        </Button>
      </div>
      <Text small center>
        Prijavljivanjem potvrđujete da ste pročitali i da se slažete sa{' '}
        <Link href="/tos" underline>
          uslovima korišćenja
        </Link>{' '}
        i{' '}
        <Link href="/privacy-policy" underline>
          politikom privatnosti
        </Link>
        .
      </Text>
    </div>
  );
};

export default Auth;
