import { collection, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import Loader from '../components/ui/Loader';
import Text from '../components/ui/Text';
import { db, getData } from '../firebase';
import { getLastVisible, getServices } from '../services/service.services';
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
  const [services, setServices] = useState(ssrServices);
  const [isLoading, setIsLoading] = useState(false);
  const [servicesEnd, setServicesEnd] = useState(false);

  const router = useRouter();

  const fetchMoreServices = async () => {
    setIsLoading(true);

    const lastVisible = await getLastVisible(services);

    const q = query(
      servicesRef,
      where('categories', 'array-contains', router.query.category),
      where('location', '==', router.query.location),
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
    </div>
  );
};

export default Services;
