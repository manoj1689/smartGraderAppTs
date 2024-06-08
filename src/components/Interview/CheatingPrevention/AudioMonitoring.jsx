import React, { useState, useEffect } from 'react';

export const AudioMonitoring = () => {
    const [audioLevel, setAudioLevel] = useState(0);
    const [isAudioInputActive, setIsAudioInputActive] = useState(false);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        let animationFrameId = null;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const draw = () => {
                    analyser.getByteTimeDomainData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += (dataArray[i] - 128) * (dataArray[i] - 128);
                    }
                    let average = Math.sqrt(sum / dataArray.length);
                    setAudioLevel(average);
                    setIsAudioInputActive(average > 5); // Threshold for activity, adjust based on your needs
                    animationFrameId = requestAnimationFrame(draw);
                };

                draw();
            })
            .catch(err => {
                console.error('Error accessing audio stream:', err);
            });

        return () => {
            cancelAnimationFrame(animationFrameId);
            audioContext.close();
        };
    }, []);

    return (
        <div>
            <h2>Audio Monitoring</h2>
            <p>Current Audio Level: {audioLevel.toFixed(2)}</p>
            <p>{isAudioInputActive ? 'Audio Input is Active' : 'Audio Input is Inactive'}</p>
        </div>
    );
};

export default AudioMonitoring;
