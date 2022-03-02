import { arrayRemove, arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import LikeButton from './LikeButton';
import Text from './ui/Text';

type ServiceCardProps = {
  service: any;
  onLike: (service: any) => void;
};

const ServiceCard = ({ service, onLike }: ServiceCardProps) => {
  const { currentUser } = useAuth();

  const isServiceLiked = (service) => service.likes?.includes(currentUser?.uid);

  const likeService = async () => {
    if (!currentUser) return toast('Morate biti prijavljeni da biste glasali.');

    let isLiked = null;
    let newService = null;

    if (isServiceLiked(service)) {
      isLiked = true;
      newService = {
        ...service,
        likes: service.likes?.filter((like) => like !== currentUser.uid),
        likesCount: service.likesCount - 1,
      };
    } else {
      isLiked = false;
      newService = {
        ...service,
        likes: [...(service.likes || []), currentUser.uid],
        likesCount: service.likesCount + 1,
      };
    }

    const serviceDocRef = doc(db, 'services', service.id);

    const updateAction = isLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid);
    const incrementValue = isLiked ? -1 : 1;

    try {
      await updateDoc(serviceDocRef, {
        likes: updateAction,
        likesCount: increment(incrementValue),
      });
      onLike(newService);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedLike = useCallback(debounce(likeService, 250), [currentUser, service]);

  return (
    <div className="relative w-80 shadow">
      <div className="flex h-20 items-center justify-center rounded-t bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2">
        <Text light bold uppercase center>
          {service.title}
        </Text>
      </div>
      <ul>
        <li className="border-b px-4 py-2 last:border-b-0">
          <a href={service.mapUrl} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex w-full items-center truncate overflow-ellipsis">
              <span className="mr-2 text-blue-500">
                <FaMapMarkerAlt />
              </span>
              {service.address.split(',')[0]}
            </span>
          </a>
        </li>
        <li className="border-b px-4 py-2 last:border-b-0" key={service.phone}>
          <a href={`tel:${service.phone}`}>
            <span className="inline-flex items-center">
              <span className="mr-2 text-blue-500">
                <FaPhoneAlt />
              </span>
              {service.phone}
            </span>
          </a>
        </li>
      </ul>
      <LikeButton
        onClick={debouncedLike}
        isLiked={isServiceLiked(service)}
        likesCount={service.likesCount}
      />
      <div className="h-4 rounded-b  bg-gradient-to-b from-blue-500 to-blue-700"></div>
    </div>
  );
};

export default ServiceCard;
