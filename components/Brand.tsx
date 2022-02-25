import { Routes } from '../util/constants/routes.constants';
import Link from './ui/Link';

const Brand = () => {
  return (
    <Link href={Routes.HOME}>
      <div className="flex items-center space-x-3">
        <img src="/logo.svg" alt="Auto Servis Lokator Logo" width="45px" height="48px" />
        <div className="font-bold uppercase text-white">
          <div className="tracking-wider">Auto Servis</div>
          <div className="text-2xl leading-none">Lokator</div>
        </div>
      </div>
    </Link>
  );
};

export default Brand;
