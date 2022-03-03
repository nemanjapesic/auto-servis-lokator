import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import { Routes } from '../util/constants/routes.constants';

const NotFound = () => {
  return (
    <div className="mx-auto p-2 pt-10 text-center">
      <Heading uppercase>404 - Stranica nije pronađena</Heading>
      <Link href={Routes.HOME} underline>
        Nazad na početnu
      </Link>
    </div>
  );
};

export default NotFound;
