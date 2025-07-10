import { FC, useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number; // opcional, duración en ms
}

const ErrorToast: FC<ErrorToastProps> = ({ message, show, onClose, duration = 8000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex w-80 items-center p-4 text-md text-red-800 bg-red-100 rounded-lg shadow-lg">
        <ErrorIcon className="mr-2" fontSize="medium" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorToast;