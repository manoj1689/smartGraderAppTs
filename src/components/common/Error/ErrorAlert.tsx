// /src/components/ErrorAlert.tsx
import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="p-4 mb-4 bg-red-500 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <span className="font-paragraph-text">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 bg-red-700 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500 font-bold"
          aria-label="Close alert"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
