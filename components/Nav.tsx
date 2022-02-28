import { useAuth } from '../context/AuthContext';
import { Routes } from '../util/constants/routes.constants';
import { cx } from '../util/helpers/classNames.helpers';
import Avatar from './Avatar';
import Link from './ui/Link';
import List from './ui/List';
import ListItem from './ui/ListItem';
import Text from './ui/Text';

const defaultLinks = [
  { text: 'Prijavi se', href: Routes.AUTH },
  { text: 'Preporuči auto servis', href: Routes.RECOMMEND },
  { text: 'Uslovi korišćenja', href: Routes.TOS },
  { text: 'Politika privatnosti', href: Routes.PRIVACY_POLICY },
];

const authLinks = [
  { text: 'Pretraga', href: Routes.SEARCH },
  { text: 'Moj auto', href: Routes.MY_CAR },
  { text: 'Omiljene lokacije', href: Routes.FAVORITES },
  { text: 'Preporuči auto servis', href: Routes.RECOMMEND },
];

type NavProps = {
  open: boolean;
};

const Nav = ({ open }: NavProps) => {
  const { currentUser, signOut } = useAuth();

  const links = currentUser ? authLinks : defaultLinks;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className={cx(
        'absolute top-full left-0 right-0 z-10 transition duration-300 md:left-auto md:w-full md:max-w-xs',
        open ? 'translate-y-0' : 'top-12 -translate-y-full'
      )}
    >
      <List>
        <>
          {currentUser && (
            <ListItem>
              <div className="flex items-center space-x-3">
                <Avatar user={currentUser} large />
                <div>
                  <Text large bold>
                    {currentUser.displayName}
                  </Text>
                  <Text small>{currentUser.email}</Text>
                </div>
              </div>
            </ListItem>
          )}
          {links.map((link) => (
            <ListItem key={link.text}>
              <Link href={link.href} fullWidth>
                {link.text}
              </Link>
            </ListItem>
          ))}
          {currentUser && (
            <ListItem>
              <span className="inline-block w-full cursor-pointer" onClick={handleSignOut}>
                Odjavi se
              </span>
            </ListItem>
          )}
        </>
      </List>
    </nav>
  );
};

export default Nav;
