import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

type ModalProps = {
  children: JSX.Element;
  show: boolean;
  onClose: () => void;
};

const Modal = ({ children, show, onClose }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const stopEventPropagation = (e) => {
    e.stopPropagation();
  };

  const modalContent = show ? (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-75"
      onClick={handleClose}
    >
      <div className="max-w-screen-md w-full p-6 bg-white rounded" onClick={stopEventPropagation}>
        <header className="flex justify-end">
          <button className="text-2xl" onClick={handleClose}>
            <FaTimes />
          </button>
        </header>
        <div className="body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
  } else {
    return null;
  }
};

export default Modal;
