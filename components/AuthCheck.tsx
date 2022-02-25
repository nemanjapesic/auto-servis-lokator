import { useAuth } from '../context/AuthContext';
import { Routes } from '../util/constants/routes.constants';
import Button from './ui/Button';
import Link from './ui/Link';
import Text from './ui/Text';

type AuthCheckProps = {
  children: JSX.Element | JSX.Element[];
  fallback?: JSX.Element | JSX.Element[];
};

const AuthCheck = ({ children, fallback }: AuthCheckProps) => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser
        ? children
        : fallback || (
            <div className="text-center">
              <Text>Morate biti prijavljeni da biste nastavili.</Text>
              <Link href={Routes.AUTH}>
                <Button light uppercase>
                  Prijavi se
                </Button>
              </Link>
            </div>
          )}
    </>
  );
};

export default AuthCheck;
