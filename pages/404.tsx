import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';
import { Routes } from '../util/constants/routes.constants';

const NotFound = () => {
  return (
    <div className="text-center">
      <Heading>404 - Page Not Found</Heading>
      <Link href={Routes.HOME} underline>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
