import { collection, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AuthCheck from '../components/AuthCheck';
import ScrollToTop from '../components/ScrollToTop';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Loader from '../components/ui/Loader';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { getLastVisible, getServices } from '../services/service.services';

const LIMIT = 9;
const servicesRef = collection(db, 'services');

const Favorites = () => {
  const { currentUser, isLoading: isUserLoading } = useAuth();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [servicesEnd, setServicesEnd] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchServices();
    }
  }, [currentUser]);

  const fetchServices = async () => {
    setIsLoading(true);

    const q = query(
      servicesRef,
      where('likes', 'array-contains', currentUser.uid),
      orderBy('likesCount', 'desc'),
      limit(LIMIT)
    );

    const services = await getServices(q);

    setIsLoading(false);
    setServices(services);
  };

  const fetchMoreServices = async () => {
    setIsLoading(true);

    const lastVisible = await getLastVisible(services);

    const q = query(
      servicesRef,
      where('likes', 'array-contains', currentUser.uid),
      orderBy('likesCount', 'desc'),
      startAfter(lastVisible),
      limit(LIMIT)
    );

    const newServices = await getServices(q);

    setIsLoading(false);
    setServices((existingServices) => [...existingServices, ...newServices]);

    if (newServices.length < LIMIT) {
      setServicesEnd(true);
    }
  };

  const handleLike = (newService) => {
    setServices((existingServices) =>
      existingServices.map((service) => {
        if (newService.id === service.id) {
          return newService;
        } else {
          return service;
        }
      })
    );
  };

  if (isUserLoading) return null;

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
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} onLike={handleLike} />
          ))}
        </div>
        <div className="mt-8 text-center">
          {!isLoading &&
            !servicesEnd &&
            (services.length < LIMIT ? null : (
              <Button onClick={fetchMoreServices}>Učitaj još</Button>
            ))}
          <Loader show={isLoading} />
          {servicesEnd && <Text>Nema više rezultata.</Text>}
        </div>
        <ScrollToTop />
      </AuthCheck>
    </div>
  );
};

export default Favorites;
