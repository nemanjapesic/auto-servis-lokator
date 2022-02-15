import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
import Link from './ui/Link';
import List from './ui/List';
import ListItem from './ui/ListItem';
import Text from './ui/Text';

const defaultLinks = [
  { text: 'Prijavi se', href: '/auth' },
  { text: 'Preporuči auto servis', href: '/recommend' },
  { text: 'Uslovi korišćenja', href: '/tos' },
  { text: 'Politika privatnosti', href: '/privacy-policy' },
];

const authLinks = [
  { text: 'Moj auto', href: '/my-car' },
  { text: 'Omiljene lokacije', href: '/favorites' },
  { text: 'Preporuči auto servis', href: '/recommend' },
  { text: 'Odjavi se', href: '/auth' },
];

type NavProps = {
  open: boolean;
};

const Nav = ({ open }: NavProps) => {
  const { currentUser } = useAuth();

  const links = currentUser ? authLinks : defaultLinks;

  return (
    <nav
      className={`absolute top-full left-0 right-0 transition duration-300 ${
        open ? 'translate-y-0' : '-translate-y-full'
      }`}
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
        </>
      </List>
    </nav>
  );
};

export default Nav;
