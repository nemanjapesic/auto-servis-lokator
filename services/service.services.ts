import { doc, getDoc } from 'firebase/firestore';
import { db, getData } from '../firebase';

export const getServices = async (q) => {
  try {
    const data = await getData(q);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLastVisible = async (services) => {
  try {
    const last = services[services.length - 1];
    const lastRef = doc(db, `services/${last.id}`);
    const lastVisible = await getDoc(lastRef);

    return lastVisible;
  } catch (error) {
    console.log(error);
  }
};
