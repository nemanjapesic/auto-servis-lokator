import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
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
};

const AuthContext = createContext(defaultValue);

export const useAuth = () => useContext(AuthContext);

// Third Party Auth
const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(null);

  const signInWithFacebook = () => signInWithPopup(auth, facebookAuthProvider);
  const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);
  const signOut = () => auth.signOut().then(() => setCurrentUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, currentUser, signInWithFacebook, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
