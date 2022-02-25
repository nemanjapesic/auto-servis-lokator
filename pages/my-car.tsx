import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthCheck from '../components/AuthCheck';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Select from '../components/ui/Select';
import Text from '../components/ui/Text';
import { useAuth } from '../context/AuthContext';
import { getUserData, updateUser } from '../firebase';
import { carBrands } from '../util/constants/carBrands.constants';

const MyCar = () => {
  const { currentUser, isLoading } = useAuth();
  const [carBrand, setCarBrand] = useState('');
  const [usersCar, setUsersCar] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUserData = async (uid) => {
    const data = await getUserData(uid);

    setUsersCar(data.car);
    setCarBrand(data.car);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carBrand) return toast('Izaberite jednu od ponuđenih opcija.');

    try {
      await updateUser(currentUser.uid, { car: carBrand });
      setUsersCar(carBrand);
      toast.success('Vaše izmene su sačuvane.');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCarBrand(e.target.value);
  };

  const imgUrl = carBrand
    ? `https://www.carlogos.org/car-logos/${carBrand.split(' ').join('-')}-logo.png`
    : '/logo-2.svg';

  if (isLoading) return null;

  return (
    <div className="mx-auto p-2">
      <Heading uppercase>Moj auto</Heading>
      <AuthCheck>
        <div className="flex h-24 justify-center">
          <img src={imgUrl} alt="Car Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <Select value={carBrand} placeholder="Moj auto" onChange={handleChange} fullWidth>
            {carBrands.map((carBrandName) => (
              <option key={carBrandName} value={carBrandName.toLowerCase()}>
                {carBrandName}
              </option>
            ))}
          </Select>
          <Text>
            Izabrani automobil će biti korišćen kao <br /> podrazumevano vozilo u pretragama.
          </Text>
          <Button fullWidth disabled={carBrand === usersCar}>
            Sačuvaj
          </Button>
        </form>
      </AuthCheck>
    </div>
  );
};

export default MyCar;
