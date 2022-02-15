import Heading from '../components/ui/Heading';
import Link from '../components/ui/Link';

const NotFound = () => {
  return (
    <div className="text-center">
      <Heading>404 - Page Not Found</Heading>
      <Link href="/" underline>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
