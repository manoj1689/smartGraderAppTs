// useTabActive.js
import { useState, useEffect } from 'react';

const useTabActive = () => {
  const [isActive, setIsActive] = useState(document.visibilityState === 'visible');

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isActive;
};

export default useTabActive;
