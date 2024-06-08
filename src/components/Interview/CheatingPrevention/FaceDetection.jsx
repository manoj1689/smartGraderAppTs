import * as faceapi from 'face-api.js';

// Assuming the models directory is in the 'public' folder and accessible at the root
const MODEL_URL = '/models';

export const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector_model-weights_manifest.json`);
    await faceapi.nets.faceLandmark68Net.loadFromUri(`${MODEL_URL}/face_landmark_68_model-weights_manifest.json`);
    await faceapi.nets.faceRecognitionNet.loadFromUri(`${MODEL_URL}/face_recognition_model-weights_manifest.json`);
};

export const detectFaces = async (videoElement) => {
    if (!videoElement) return { faceVerified: false, multiplePeopleDetected: false };

    // Detect all faces with landmarks and descriptors using Tiny Face Detector options
    const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

    // Assume the first face is the verified user (simple implementation)
    const faceVerified = detections.length > 0;
    const multiplePeopleDetected = detections.length > 1;

    return { faceVerified, multiplePeopleDetected };
};

export const detectMultiplePeople = async (videoElement) => {
    if (!videoElement) return { multiplePeopleDetected: false };

    // Detect all faces without additional details for efficiency
    const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions());
    return { multiplePeopleDetected: detections.length > 1 };
};


// import React, { useEffect, useRef } from 'react';
// import { loadModels, detectFaces } from './FaceDetection';

// const VideoComponent = () => {
//     const videoRef = useRef();

//     useEffect(() => {
//         const setupVideo = async () => {
//             await loadModels();
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//             videoRef.current.play();

//             // Example: Detect faces every 5 seconds
//             setInterval(async () => {
//                 const results = await detectFaces(videoRef.current);
//                 console.log('Detection Results:', results);
//             }, 5000);
//         };

//         setupVideo();

//         return () => videoRef.current && videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     }, []);

//     return <video ref={videoRef} autoPlay muted width="720" height="560"></video>;
// };

// export default VideoComponent;
