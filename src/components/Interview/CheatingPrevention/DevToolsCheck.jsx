// DevToolsCheck.jsx
import { useState, useEffect } from 'react';

const useDevToolsDetection = () => {
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
    const threshold = 160; // Threshold for dev tools detection

    useEffect(() => {
        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            const devToolsDetected = widthThreshold || heightThreshold;

            setIsDevToolsOpen(devToolsDetected);
        };

        detectDevTools();
        const interval = setInterval(detectDevTools, 1000);
        window.addEventListener('resize', detectDevTools);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', detectDevTools);
        };
    }, []);

    return isDevToolsOpen;
};

export default useDevToolsDetection;
