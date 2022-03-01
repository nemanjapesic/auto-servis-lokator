import { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FaArrowCircleUp
      className={`fixed right-6 bottom-8 cursor-pointer rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-500 to-blue-700 text-4xl text-white transition-all hover:scale-110 hover:to-blue-600 ${
        showScroll ? 'hidden xl:flex' : 'hidden'
      }`}
      onClick={scrollTop}
    />
  );
};

export default ScrollToTop;
