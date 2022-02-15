import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaFacebookF, FaGoogle, FaSignOutAlt } from 'react-icons/fa';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { isLoading, currentUser, signInWithFacebook, signInWithGoogle, signOut } = useAuth();
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [alert, setAlert] = useState(null);

  const router = useRouter();

  const handleFacebookSignIn = async () => {
    try {
      setIsAuthInProgress(true);
      await signInWithFacebook();
      setIsRedirecting(true);
      router.push('/');
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
      setIsRedirecting(true);
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
      setIsRedirecting(true);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    if (!currentUser) {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
          <Heading uppercase>Odjavi se</Heading>
          <div>
            <Button fullWidth icon={<FaSignOutAlt />} onClick={handleSignOut}>
              Odjavi se
            </Button>
          </div>
        </>
      );
    }
  };

  if (isLoading || isRedirecting) return null;

  return <div className="flex flex-col items-center mx-auto">{renderContent()}</div>;
};

export default Auth;
