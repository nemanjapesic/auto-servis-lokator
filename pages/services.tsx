import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import Loader from '../components/ui/Loader';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { db, getData } from '../firebase';
import { Routes } from '../util/constants/routes.constants';

const LIMIT = 9;
const servicesRef = collection(db, 'services');

export const getServerSideProps = async ({ query: params }) => {
  if (!params.category) return { props: { services: [] } };

  const q1 = query(
    servicesRef,
    where('categories', 'array-contains', params.category),
    where('location', '==', params.location),
    orderBy('likesCount', 'desc'),
    limit(LIMIT)
  );

  const data = await getData(q1);

  return {
    props: { services: data || [] },
  };
};

const Services = ({ services: ssrServices }) => {
  const { currentUser } = useAuth();

  const [services, setServices] = useState(ssrServices);
  const [isLoading, setIsLoading] = useState(false);
  const [servicesEnd, setServicesEnd] = useState(false);

  const router = useRouter();

  const getMoreServices = async () => {
    setIsLoading(true);

    try {
      const last = services[services.length - 1];
      const lastRef = doc(db, `services/${last.id}`);
      const lastVisible = await getDoc(lastRef);

      const q = query(
        servicesRef,
        where('categories', 'array-contains', router.query.category),
        where('location', '==', router.query.location),
        orderBy('likesCount', 'desc'),
        startAfter(lastVisible),
        limit(LIMIT)
      );

      const newServices = await getData(q);

      setServices((existingServices) => [...existingServices, ...newServices]);
      setIsLoading(false);

      if (newServices.length < LIMIT) {
        setServicesEnd(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  return (
    <div className="mx-auto p-2 pt-10">
      <Heading uppercase>Auto servisi</Heading>
      {!services.length && (
        <div className="text-center">
          <Text>Na žalost nije pronađen nijedan rezultat koji odgovara zadatim kriterijumima.</Text>
          <Link href={Routes.SEARCH}>
            <Button light uppercase>
              Nazad na pretragu
            </Button>
          </Link>
        </div>
      )}
      <div className="flex max-w-screen-lg flex-wrap justify-center gap-4 gap-y-6">
        {services?.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onLike={debouncedLike}
            isLiked={isServiceLiked(service)}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        {!isLoading &&
          !servicesEnd &&
          (services.length < LIMIT ? null : <Button onClick={getMoreServices}>Učitaj još</Button>)}
        <Loader show={isLoading} />
        {servicesEnd && <Text>Nema više rezultata.</Text>}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Services;
