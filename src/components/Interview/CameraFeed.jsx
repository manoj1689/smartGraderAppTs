import React, { useEffect, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';
import { uploadScreenshot } from '../../services/api/InterviewService';
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
    const token = localStorage.getItem("accessToken");
    const { questionSetId } = useParams();
    const screenshotIntervalRef = useRef(null);  // Reference for screenshot interval

    const handleVideoPlay = useCallback(() => {
        intervalIdRef.current = setInterval(async () => {
            if (videoRef.current) {
                const detections = await detectFaces(videoRef.current);
             //   console.log('Detections:', detections);

                const faceVerified = detections.length > 0;
                const multiplePeopleDetected = detections.length > 1;
               // console.log(`Face Verified: ${faceVerified}, Multiple People Detected: ${multiplePeopleDetected}`);

                if (!faceVerified && !noFaceTimeoutRef.current) {
                    noFaceTimeoutRef.current = setTimeout(() => {
                        console.log('No face detected for more than 10 seconds.');
                        toast.warn('No face detected for more than 10 seconds.');
                    }, 10000);
                } else if (faceVerified && noFaceTimeoutRef.current) {
                    clearTimeout(noFaceTimeoutRef.current);
                    noFaceTimeoutRef.current = null;
                }

                if (multiplePeopleDetected && !multipleFaceTimeoutRef.current) {
                    multipleFaceTimeoutRef.current = setTimeout(() => {
                        console.log('Multiple faces detected for more than 10 seconds.');
                        toast.warn('Multiple faces detected for more than 10 seconds.');
                    }, 10000);
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

    const handleUploadMedia = async (file) => {
        try {
          await uploadScreenshot(questionSetId, token, file);    
        } catch (error) {
          console.log(' error', error) //TODO handle error here
        }
      };

      const captureScreenshot = useCallback(async () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('file', blob, 'screenshot.png');

                handleUploadMedia(formData)
            }, 'image/png');
        }
        }, []);

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
            if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current); // Clear screenshot interval
            if (multipleFaceTimeoutRef.current) clearTimeout(multipleFaceTimeoutRef.current);
            stopCamera(currentVideoRef);
        };
    }, [handleVideoPlay]);

    useEffect(() => {
        if (examStarted) {
            screenshotIntervalRef.current = setInterval(captureScreenshot, 30000); // Take screenshots every 30 seconds
        } else {
            if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current);
        }
        return () => {
            if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current);
        };
    }, [examStarted, captureScreenshot]);

    return (
        <div>
            <video ref={videoRef} autoPlay muted style={{ width: '100%', borderRadius: '1%' }} />
        </div>
    );
};

export default React.memo(CameraFeed);
