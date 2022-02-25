import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as authSignOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, createUser } from '../firebase';
import { formatUser } from '../util/helpers/user.helpers';

const defaultValue = {
  isLoading: null,
  currentUser: null,
  signInWithFacebook: null,
  signInWithGoogle: null,
  signOut: null,
  fbAccessToken: null,
};

const AuthContext = createContext(defaultValue);

export const useAuth = () => useContext(AuthContext);

// Third Party Auth
const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [fbAccessToken, setFbAccessToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const formattedUser = formatUser(user);
        setCurrentUser(formattedUser);
      }
      setIsLoading(false);
    });

    const localFbAccessToken = localStorage.getItem('fbAccessToken');
    setFbAccessToken(localFbAccessToken);

    return unsubscribe;
  }, []);

  // Auth Actions
  const signInWithFacebook = () =>
    signInWithPopup(auth, facebookAuthProvider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const fbAccessToken = credential.accessToken;

      setFbAccessToken(fbAccessToken);
      localStorage.setItem('fbAccessToken', fbAccessToken);

      handleUser(result.user);
    });

  const signInWithGoogle = () =>
    signInWithPopup(auth, googleAuthProvider).then((result) => handleUser(result.user));

  const signOut = () =>
    authSignOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem('fbAccessToken');
    });

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      try {
        await createUser(user.uid, user);
        setCurrentUser(user);
        return user;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentUser(null);
      setIsLoading(false);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        currentUser,
        signInWithFacebook,
        signInWithGoogle,
        signOut,
        fbAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
