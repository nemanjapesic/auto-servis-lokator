import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore } from 'firebase/firestore';

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
