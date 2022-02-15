import { useEffect } from 'react';

const useClickOutside = (ref: React.MutableRefObject<any>, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
