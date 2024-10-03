
import React, { useCallback, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { toast, ToastContainer } from 'react-toastify';
import Webcam from 'react-webcam';

const MODEL_URL = '/models';

const loadModels = async () => {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log('Models loaded');
    } catch (error) {
        console.error('Error loading models:', error);
    }
};

const detectFaces = async (videoElement) => {
    if (!videoElement) return [];
    try {
        return await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
    } catch (error) {
        console.error('Error detecting faces:', error);
        return [];
    }
};

const CameraFeed = ({ onFacesDetected, examStarted }) => {
    const webcamRef = useRef(null);
    const intervalIdRef = useRef(null);

    const handleVideoPlay = useCallback(() => {
        intervalIdRef.current = setInterval(async () => {
            if (webcamRef.current && webcamRef.current.video) {
                const detections = await detectFaces(webcamRef.current.video);
                const faceVerified = detections.length > 0;
                const multiplePeopleDetected = detections.length > 1;

                onFacesDetected({
                    faceVerified,
                    multiplePeopleDetected,
                });
            }
        }, 500);
    }, [onFacesDetected]);

    useEffect(() => {
        const loadAndStart = async () => {
            await loadModels();
            if (examStarted) {
                handleVideoPlay();
            }
        };

        if (examStarted) {
            loadAndStart();
        }

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, [examStarted, handleVideoPlay]);

    return (
        <div className='flex'>
            <ToastContainer />
            <Webcam ref={webcamRef} muted autoPlay mirrored="false" style={{ width: '100%', borderRadius: '1%' }} />
        </div>
    );
};

export default React.memo(CameraFeed);
