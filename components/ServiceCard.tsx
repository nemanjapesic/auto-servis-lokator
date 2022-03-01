import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LikeButton from './LikeButton';
import ListItem from './ui/ListItem';
import Text from './ui/Text';

type ServiceCardProps = {
  service: any;
  onLike: (id: string) => void;
  isLiked: boolean;
};

const ServiceCard = ({ service, onLike, isLiked }: ServiceCardProps) => {
  const { currentUser } = useAuth();

  return (
    <div className="relative w-80 shadow">
      <div className="flex h-20 items-center justify-center rounded-t bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2">
        <Text light bold uppercase center>
          {service.title}
        </Text>
      </div>
      <ul>
        <ListItem>
          <a href={service.mapUrl} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex w-full items-center truncate overflow-ellipsis">
              <span className="mr-2 text-blue-500">
                <FaMapMarkerAlt />
              </span>
              {service.address.split(',')[0]}
            </span>
          </a>
        </ListItem>
        <ListItem key={service.phone}>
          <a href={`tel:${service.phone}`}>
            <span className="inline-flex items-center">
              <span className="mr-2 text-blue-500">
                <FaPhoneAlt />
              </span>
              {service.phone}
            </span>
          </a>
        </ListItem>
      </ul>
      <LikeButton
        onClick={() => {
          if (!currentUser) return toast('Morate biti prijavljeni da biste glasali.');
          onLike(service.id);
        }}
        isLiked={isLiked}
        likesCount={service.likesCount}
      />
      <div className="h-4 rounded-b  bg-gradient-to-b from-blue-500 to-blue-700"></div>
    </div>
  );
};

export default ServiceCard;
