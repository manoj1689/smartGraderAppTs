// CheatingPrevention.jsx
import React, { useState, useEffect } from 'react';
import useDevToolsDetection from './DevToolsCheck';

const CheatingPrevention = () => {
    const isDevToolsOpen = useDevToolsDetection();
    const [isFullScreen, setIsFullScreen] = useState(!!document.fullscreenElement);
    const [tabIsActive, setTabIsActive] = useState(document.visibilityState === 'visible');

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        const handleVisibilityChange = () => {
            setTabIsActive(document.visibilityState === 'visible');
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="cheating-prevention">
            <h2>Cheating Prevention Monitor</h2>
            <p>Developer Tools Open: {isDevToolsOpen ? 'Yes' : 'No'}</p>
            <p>Full Screen: {isFullScreen ? 'Yes' : 'No'}</p>
            <p>Tab Active: {tabIsActive ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default CheatingPrevention;
