import Image from 'next/image';
import Link from './ui/Link';

const Brand = () => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-3">
        <Image src="/logo.svg" alt="Auto Servis Lokator Logo" width="45" height="48" />
        <div className="font-bold uppercase text-white">
          <div className="tracking-wider">Auto Servis</div>
          <div className="text-2xl leading-none">Lokator</div>
        </div>
      </div>
    </Link>
  );
};

export default Brand;
