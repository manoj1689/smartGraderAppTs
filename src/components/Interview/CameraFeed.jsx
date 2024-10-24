import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { toast, ToastContainer } from 'react-toastify';
import Webcam from 'react-webcam';

const MODEL_URL = '/models';

const CameraFeed = ({ onFacesDetected, examStarted }) => {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const webcamRef = useRef(null);
    const intervalIdRef = useRef(null);

    const loadModels = async () => {
        try {
            console.log('Loading face detection models...');
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector_model-weights_manifest.json');
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models/ssd_mobilenetv1_model-weights_manifest.json');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68_model-weights_manifest.json');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition_model-weights_manifest.json');
            await faceapi.nets.faceExpressionNet.loadFromUri('/models/face_expression_model-weights_manifest.json'); // Load this model
            setModelsLoaded(true);
            console.log('All models loaded successfully');
        } catch (error) {
            console.error('Error loading models:', error);
        }
    };
    

    useEffect(() => {
        loadModels(); // Load models when component mounts
    }, []);

    // Face detection logic
    const detectFaces = async (videoElement) => {
        if (!videoElement) return [];
        try {
            return await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions(); // Optionally, include landmarks and expressions
        } catch (error) {
            console.error('Error detecting faces:', error);
            return [];
        }
    };

    const handleVideoPlay = useCallback(() => {
        if (modelsLoaded && webcamRef.current && webcamRef.current.video) {
            intervalIdRef.current = setInterval(async () => {
                const detections = await detectFaces(webcamRef.current.video);
                  // Log detections to the console
        //    console.log('Face Detections:', detections);
                const faceVerified = detections.length > 0;
                const multiplePeopleDetected = detections.length > 1;

                onFacesDetected({
                    faceVerified,
                    multiplePeopleDetected,
                    detections,  // Optionally pass the face detection details
                });
            }, 500);
        }
    }, [onFacesDetected, modelsLoaded]);

    useEffect(() => {
        if (examStarted && modelsLoaded) {
            handleVideoPlay(); // Start detecting faces if exam has started and models are loaded
        }

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current); // Cleanup on unmount
        };
    }, [examStarted, handleVideoPlay, modelsLoaded]);

    return (
        <div className='flex '>
            <ToastContainer />
            <Webcam ref={webcamRef} muted autoPlay mirrored="false" style={{ width: '100%', borderRadius: '1%' }} />
        </div>
    );
};

export default React.memo(CameraFeed);

