import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import Text from '../components/ui/Text';
import { Routes } from '../util/constants/routes.constants';

const Home = () => {
  return (
    <div className="flex-auto bg-gradient-to-b from-blue-500 to-blue-700 p-2 text-center">
      <div className="flex justify-center pt-6">
        <img src="/logo.svg" alt="Auto Servis Lokator Logo" width="96px" height="104px" />
      </div>
      <Heading light uppercase>
        Dobro Došli!
      </Heading>
      <div className="font-thin">
        <Text light>
          <span className="font-normal italic">Auto Servis Lokator</span> je mesto na kome možete
          pronaći najbolje auto servise u vašoj okolini i glasati za one čijim ste uslugama i
          načinom poslovanja zadovoljni.
        </Text>
        <Text light>
          Glasanjem pomažete servisima da dođu na vrh pretrage a samim tim i ostalim vozačima da
          lakše dođu do najboljih auto servisa.
        </Text>
        <br />
        <Text light>
          <span className="font-normal italic">Auto Servis Lokator</span> je trenutno u fazi
          prikupljanja informacija o najboljim i najpouzdanijim pružaocima auto usluga.
        </Text>
        <Text light>
          Ukoliko želite da doprinesete vozačkoj zajednici i podelite sa ostalima vaša dobra
          iskustva, možete preporučiti servise čijim ste uslugama i načinom poslovanja zadovoljni.
        </Text>
        <Text light>Hvala!</Text>
        <br />
        <Link href={Routes.RECOMMEND}>
          <Button light uppercase>
            Preporuči
          </Button>
        </Link>
        <Text light>ili</Text>
        <Text light uppercase>
          <Link href={Routes.SEARCH}>Pretraži i glasaj za postojeće auto usluge</Link>
        </Text>
      </div>
    </div>
  );
};

export default Home;
