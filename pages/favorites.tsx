import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import AuthCheck from '../components/AuthCheck';
import ServiceCard from '../components/ServiceCard';
import Heading from '../components/ui/Heading';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { db, getData } from '../firebase';

const servicesRef = collection(db, 'services');

const Favorites = () => {
  const { currentUser, isLoading } = useAuth();

  const [services, setServices] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getServices();
    }
  }, [currentUser]);

  const getServices = async () => {
    try {
      const q = query(
        servicesRef,
        where('likes', 'array-contains', currentUser.uid),
        orderBy('likesCount', 'desc')
      );

      const data = await getData(q);

      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  const likeService = async (id) => {
    let isLiked = null;

    const newServices = services.map((service) => {
      if (service.id === id) {
        if (isServiceLiked(service)) {
          isLiked = true;
          return {
            ...service,
            likes: service.likes?.filter((like) => like !== currentUser.uid),
            likesCount: service.likesCount - 1,
          };
        } else {
          isLiked = false;
          return {
            ...service,
            likes: [...(service.likes || []), currentUser.uid],
            likesCount: service.likesCount + 1,
          };
        }
      }
      return service;
    });

    const serviceDocRef = doc(db, 'services', id);

    const updateAction = isLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid);
    const incrementValue = isLiked ? -1 : 1;

    try {
      await updateDoc(serviceDocRef, {
        likes: updateAction,
        likesCount: increment(incrementValue),
      });
      setServices(newServices);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedLike = useCallback(debounce(likeService, 250), [currentUser, services]);

  const isServiceLiked = (service) => service.likes?.includes(currentUser?.uid);

  if (isLoading) return null;

  return (
    <div className="mx-auto p-2 pt-10">
      <Heading uppercase>Omiljene lokacije</Heading>
      <AuthCheck>
        {!services?.length && (
          <div className="text-center">
            <Text>Nema omiljenih lokacija.</Text>
          </div>
        )}
        <div className="flex max-w-screen-lg flex-wrap justify-center gap-4 gap-y-6">
          {services?.map((service) =>
            isServiceLiked(service) ? (
              <ServiceCard
                key={service.id}
                service={service}
                onLike={debouncedLike}
                isLiked={isServiceLiked(service)}
              />
            ) : null
          )}
        </div>
      </AuthCheck>
    </div>
  );
};

export default Favorites;
