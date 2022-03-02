import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const createUser = (uid, data) => {
  const userRef = doc(db, `users/${uid}`);

  return setDoc(
    userRef,
    {
      uid,
      ...data,
    },
    { merge: true }
  );
};

export const getUserData = async (uid) => {
  const userRef = doc(db, `users/${uid}`);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (uid, data) => {
  const userRef = doc(db, `users/${uid}`);

  return updateDoc(userRef, data);
};
