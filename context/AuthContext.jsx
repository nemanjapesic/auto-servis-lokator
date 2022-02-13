import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Third Party Auth
const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

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
