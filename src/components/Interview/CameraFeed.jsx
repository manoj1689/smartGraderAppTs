import React, { useEffect, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

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

const stopCamera = (videoElement) => {
    if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null; // Clear the srcObject
        console.log('Video stream stopped');
    }
};

const CameraFeed = ({ onFacesDetected, examStarted }) => {
    const videoRef = useRef(null);
    const intervalIdRef = useRef(null);
    const noFaceTimeoutRef = useRef(null);
    const multipleFaceTimeoutRef = useRef(null);
    const { questionSetId } = useParams();

    const handleVideoPlay = useCallback(() => {
        intervalIdRef.current = setInterval(async () => {
            if (videoRef.current) {
                const detections = await detectFaces(videoRef.current);
                const faceVerified = detections.length > 0;
                const multiplePeopleDetected = detections.length > 1;

                if (!faceVerified) {
                    if (!noFaceTimeoutRef.current) {
                        noFaceTimeoutRef.current = setTimeout(() => {
                            console.log('No face detected for more than 20 seconds.');
                            toast.warn('No face detected for more than 20 seconds.');
                            noFaceTimeoutRef.current = null; // Reset the timeout reference
                        }, 20000);
                    }
                } else {
                    if (noFaceTimeoutRef.current) {
                        clearTimeout(noFaceTimeoutRef.current);
                        noFaceTimeoutRef.current = null;
                    }
                }

                if (multiplePeopleDetected && !multipleFaceTimeoutRef.current) {
                    multipleFaceTimeoutRef.current = setTimeout(() => {
                        console.log('Multiple faces detected for more than 20 seconds.');
                        toast.warn('Multiple faces detected for more than 20 seconds.');
                    }, 20000);
                } else if (!multiplePeopleDetected && multipleFaceTimeoutRef.current) {
                    clearTimeout(multipleFaceTimeoutRef.current);
                    multipleFaceTimeoutRef.current = null;
                }

                // Pass detections to the parent component
                onFacesDetected({
                    faceVerified,
                    multiplePeopleDetected
                });
            }
        }, 500);
    }, [onFacesDetected]);

    useEffect(() => {
        const currentVideoRef = videoRef.current; // Copy videoRef.current to a local variable

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoRef.current.srcObject = stream;
                console.log('Video stream started');
                videoRef.current.onplay = handleVideoPlay;
            } catch (err) {
                console.error('Error accessing webcam and microphone:', err);
            }
        };

        const loadAndStart = async () => {
            await loadModels();
            await startVideo();
        };

        loadAndStart();

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
            if (noFaceTimeoutRef.current) clearTimeout(noFaceTimeoutRef.current);
            if (multipleFaceTimeoutRef.current) clearTimeout(multipleFaceTimeoutRef.current);
            stopCamera(currentVideoRef);
        };
    }, [handleVideoPlay]);

    return (
        <div className='flex '>
            <ToastContainer/>
            <video ref={videoRef} autoPlay muted style={{ width: '100%', borderRadius: '1%' }} />
        </div>
    );
};

export default React.memo(CameraFeed);




