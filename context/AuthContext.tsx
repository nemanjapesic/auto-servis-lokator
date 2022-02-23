import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as authSignOut,
  User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const defaultValue = {
  isLoading: null,
  currentUser: null,
  signInWithFacebook: null,
  signInWithGoogle: null,
  signOut: null,
  providerId: null,
  fbAccessToken: null,
};

const AuthContext = createContext(defaultValue);

export const useAuth = () => useContext(AuthContext);

// Third Party Auth
const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [providerId, setProviderId] = useState(null);
  const [fbAccessToken, setFbAccessToken] = useState(null);

  const signInWithFacebook = () =>
    signInWithPopup(auth, facebookAuthProvider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const fbAccessToken = credential.accessToken;

      setFbAccessToken(fbAccessToken);
      localStorage.setItem('fbAccessToken', fbAccessToken);
    });

  const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);

  const signOut = () =>
    authSignOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem('fbAccessToken');
    });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setProviderId(user.providerData[0].providerId);
      }
      setIsLoading(false);
    });

    const localFbAccessToken = localStorage.getItem('fbAccessToken');
    setFbAccessToken(localFbAccessToken);

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        currentUser,
        signInWithFacebook,
        signInWithGoogle,
        signOut,
        providerId,
        fbAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
