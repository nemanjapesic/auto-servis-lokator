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
  const [currentUser, setCurrentUser] = useState<User>();

  const signInWithFacebook = () => signInWithPopup(auth, facebookAuthProvider);
  const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);
  const signOut = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setCurrentUser(currentUser));
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signInWithFacebook, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
