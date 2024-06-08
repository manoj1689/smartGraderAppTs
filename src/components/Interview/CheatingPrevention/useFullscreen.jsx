// useFullscreen.js
import { useState, useCallback, useEffect } from 'react';

const useFullscreen = (ref) => {
  const [isFullscreen, setIsFullscreen] = useState(document.fullscreenElement !== null);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      ref.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [ref]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return [isFullscreen, toggleFullscreen];
};

export default useFullscreen;
