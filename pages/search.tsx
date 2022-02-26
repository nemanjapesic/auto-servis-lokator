import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthCheck from '../components/AuthCheck';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Select from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import { getUserData } from '../firebase';
import { carBrands } from '../util/constants/carBrands.constants';
import { municipalities } from '../util/constants/location.constants';
import { categories } from '../util/constants/categories.constants';
import { Routes } from '../util/constants/routes.constants';

const Search = () => {
  const { currentUser, isLoading } = useAuth();
  const [car, setCar] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUserData = async (uid) => {
    const data = await getUserData(uid);

    setCar(data.car);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !location || !car) return toast('Izaberite kriterijume pretrage.');

    router.push({ pathname: Routes.SERVICES, query: { car, category, location } });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'car':
        setCar(e.target.value);
        break;
      case 'category':
        setCategory(e.target.value);
        break;
      case 'location':
        setLocation(e.target.value);
        break;

      default:
        return;
    }
  };

  if (isLoading) return null;

  return (
    <div className="mx-auto p-2">
      <Heading uppercase>
        Pronađite najbolje <br /> auto usluge u vašoj okolini
      </Heading>
      <form onSubmit={handleSubmit}>
        <Select
          value={category}
          placeholder="Kategorija"
          label="Kategorija"
          onChange={handleChange}
          name="category"
          fullWidth
        >
          {categories.map((categoryName) => (
            <option key={categoryName} value={categoryName.toLowerCase()}>
              {categoryName}
            </option>
          ))}
        </Select>
        <Select
          value={location}
          placeholder="Lokacija"
          label="Lokacija"
          onChange={handleChange}
          name="location"
          fullWidth
        >
          {municipalities.map((municipality) => (
            <option key={municipality} value={municipality.toLowerCase()}>
              {municipality}
            </option>
          ))}
        </Select>
        <Select
          value={car}
          placeholder="Automobil"
          label="Automobil"
          onChange={handleChange}
          name="car"
          fullWidth
        >
          {carBrands.map((car) => (
            <option key={car} value={car.toLowerCase()}>
              {car}
            </option>
          ))}
        </Select>
        <Button fullWidth>Traži</Button>
      </form>
    </div>
  );
};

export default Search;
