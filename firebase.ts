import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// User Actions
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

export const getData = async (query) => {
  try {
    const snapshot = await getDocs(query);

    const data = snapshot.docs.map((doc) => {
      const docData = doc.data() as any;
      return {
        ...docData,
        id: doc.id,
      };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
