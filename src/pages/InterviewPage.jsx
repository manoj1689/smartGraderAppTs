import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaMicrophoneAlt, FaMicrophoneAltSlash } from "react-icons/fa";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {  useNavigate } from "react-router-dom";


import AnswerField from "../components/Interview/AnswerField";
import Checklist from "../components/Interview/Checklist";
import CameraFeed from "../components/Interview/CameraFeed";

import useFullscreen from "../components/Interview/CheatingPrevention/useFullscreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import { GiSoundWaves } from "react-icons/gi";
import QuestionDisplay from "../components/Interview/QuestionDisplay";
import BrowserInstructions from "../components/Interview/BrowserInstructions";

import { CiMicrophoneOn } from "react-icons/ci";
import { examEnd, examStart, fetchSetQuestions, submitAnswer } from "../services/api/InterviewService";
import { MESSAGES } from "../constants/constants";
import NotificationBar from "../components/common/Notification/NotificationBar";
import { useParams } from "react-router-dom";

const InterviewScreen = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionsLength, setQuestionsLength] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(false);

  const {
    transcript: liveTranscript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition();

  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    fullscreen: false,
    devToolsOpen: false,
  });
  const [faceDetectionResults, setFaceDetectionResults] = useState({
    faceVerified: false,
    multiplePeopleDetected: false,
  });
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const synth = window.speechSynthesis;
  const fullscreenRef = useRef(null);
  const { questionSetId } = useParams();

  const speak = useCallback(
    (text) => {
      if (synth.speaking) {
        synth.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setTtsPlaying(false);
      synth.speak(utterance);
      setTtsPlaying(true);
    },
    [synth]
  );


  useEffect(() => { 
    const fetchQuestionsData = async () => {
      try {
        
        const questionsData = await fetchSetQuestions(questionSetId, token);
        setQuestionsData(questionsData);
        setQuestionsLength(questionsData.length)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchQuestionsData()
  }, []);

  const handleSubmitAnswer = async () => {
    setLoading(true);
    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000);
    try {
      await submitAnswer(currentQuestion?.id, questionSetId, duration, answer, token);
      if(!isTimeOut){
        handleNextQuestion();
      }
      setAnswer('')
    } catch (error) {
      setError(MESSAGES.SUBMIT_ANSWER_ERROR);
    }finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswerWithoutNext = async () => {
    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000);
    try {
      await submitAnswer(currentQuestion?.id, questionSetId, duration, answer, token);
      setAnswer('')
    } catch (error) {
      setError(MESSAGES.SUBMIT_ANSWER_ERROR);
    }finally {
      setLoading(false);
    }
  };


  const handleExamStart = async () => {
    setLoading(true);
    try {
      await examStart(questionSetId,token);
      setExamStarted(true)
    } catch (error) {
      setError(MESSAGES.EXAM_STARTED_ERROR);
    }finally {
      setLoading(false);
    }
  };

  const handleExamEnd = async () => {
    setLoading(true);
    try {
      await handleSubmitAnswer()
      await examEnd(questionSetId,token);
      navigate(`/dashboard/question/exam-end`);

    } catch (error) {
      setError(MESSAGES.EXAM_END_ERROR);
    }finally {
      setLoading(false);
    }
  };

  
  const handleNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, []);

  const currentQuestion = questionsData[currentQuestionIndex];

  async function requestCameraAndMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const cameraStatus = await navigator.permissions.query({
        name: "camera",
      });
      const microphoneStatus = await navigator.permissions.query({
        name: "microphone",
      });
      setPermissions((prev) => ({
        ...prev,
        camera: cameraStatus.state === "granted",
        microphone: microphoneStatus.state === "granted",
      }));
    } catch (error) {
      console.error("Error requesting media permissions:", error);
    }
  }

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen().catch((err) => {
        console.error(`Failed to enter fullscreen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Failed to exit fullscreen mode: ${err.message}`);
      });
    }
  }, []);

  const checkFullscreenStatus = useCallback(() => {
    const isFullscreen = document.fullscreenElement !== null;
    setPermissions((prev) => ({ ...prev, fullscreen: isFullscreen }));
  }, []);

  const handleVisibilityChange = useCallback(() => {
    const isActive = document.visibilityState === "visible";
    setPermissions((prev) => ({ ...prev, tabActive: isActive }));
  }, []);

  const detectDevToolsOpen = useCallback(() => {
    const threshold = 100;
    const devToolsOpen = window.outerWidth - window.innerWidth > threshold;
    setPermissions((prev) => ({ ...prev, devToolsOpen }));
  }, []);

  useEffect(() => {
    requestCameraAndMicrophone();

    document.addEventListener("fullscreenchange", checkFullscreenStatus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", detectDevToolsOpen);

    checkFullscreenStatus();
    handleVisibilityChange();
    detectDevToolsOpen();

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreenStatus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", detectDevToolsOpen);
    };
  }, [checkFullscreenStatus, detectDevToolsOpen, handleVisibilityChange]);

  const handleFacesDetected = useCallback((results) => {
    setFaceDetectionResults(results);
  }, []);

  const handleAnswerChange = useCallback((event) => {
    if (listening) { 
      stopListening();
    }
    setAnswer(event.target.value);
  }, [listening]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };


  useEffect(() => {
    if (!listening) {
      setAnswer(prev => `${prev} ${transcript}`.trim());
      setTranscript("");
      resetTranscript();
    } else {
      setTranscript(liveTranscript);
    }
  }, [listening, liveTranscript]);

  const areAllPermissionsGranted = permissions.camera && permissions.microphone && permissions.fullscreen && !permissions.devToolsOpen;


  // if (!questionsData.length) {
  //   return <div>Loading...</div>;
  // }


  useEffect(() => {
    let timerInterval;

    if (examStarted) {
      setStartTime(new Date());
      setRemainingTime(questionsData[currentQuestionIndex]?.duration);

      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            setIsTimeOut(true)
            handleSubmitAnswerWithoutNext(); // Auto-submit when time runs out
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [examStarted, currentQuestionIndex, questionsData]);

  return (
    <div className="container mx-auto w-full h-full px-4 md:px-10 ">
      <NotificationBar/> 

      <div className="rounded-md border border-solid my-5 border-black border-opacity-10 bg-white">
        <ErrorBoundary>
          <div ref={fullscreenRef} className="container mx-auto flex h-screen ">
            <div className="flex flex-col basis-1/3 rounded-md border border-solid m-5 border-black border-opacity-10">
              <div className="mt-5">
                <CameraFeed onFacesDetected={handleFacesDetected} examStarted={examStarted}/>
              </div>
            
              <div className="mt-4">
                <Checklist
                  items={[
                    { label: "Camera Access", isChecked: permissions.camera },
                    { label: "Microphone Access", isChecked: permissions.microphone },
                    { label: "Fullscreen Mode", isChecked: permissions.fullscreen },
                    { label: "DevTools Closed", isChecked: !permissions.devToolsOpen },
                  ]}
                />
                <div className=" p-4 border-t border-solid border-black border-opacity-10">
                  <button
                      onClick={toggleFullscreen}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {permissions.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    </button>

                </div>
              </div>
            </div>
            <div className="flex flex-col basis-2/3 rounded-md border border-solid my-5 mr-5 border-black border-opacity-10">
                  {
                    examStarted && 
                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between p-4 border-b border-solid border-black border-opacity-10 my-5 mr-5">
                        <h2 className="text-base text-neutral-600">Frontend Developer Interview</h2>
                          <div className="text-right">
                            <p className="text-base text-neutral-600">Time left: <span className="font-bold">{remainingTime}</span> seconds</p>
                          </div>
                      </div>
                      <div className="w-full text-xl font-semibold leading-6 text-neutral-700">
                        Question {currentQuestion?.id}
                        <span className="text-xs text-neutral-600"> (Click the waves icon to listen to question)</span>
                      </div>
                      <div className="flex flex-col md:flex-row text-base leading-5 text-neutral-600 gap-2.5 justify-between px-4 py-4 mt-2.5 w-full rounded-md border border-solid border-neutral-500">
                        <QuestionDisplay
                          questionText={currentQuestion ? currentQuestion.title : "Loading question..."}
                        />
                        <div className="flex items-center px-4 rounded">
                          <span onClick={() => speak(currentQuestion.title)} className="cursor-pointer">
                            <GiSoundWaves size={35} color="01AFF4" />
                          </span>
                          <span onClick={() => speak(currentQuestion.title)} className="cursor-pointer">
                            <GiSoundWaves size={35} color="01AFF4" />
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <AnswerField
                          value={answer + (listening ? ` ${transcript}` : '')}
                          onChange={handleAnswerChange}
                          placeholder="Type your answer here..."
                          charLimit={500}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          disabled={isTimeOut}
                        />
                        <div 
                          className={`absolute bottom-10 left-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer ${
                            listening ? 'text-red-500 hover:text-gray-700' : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => {
                            if (!isTimeOut) {
                              listening ? stopListening() : startListening();
                            }
                          }}
                          >
                            {listening ? (
                              <FaMicrophoneAltSlash size={25} className="mr-2" />
                            ) : (
                              <FaMicrophoneAlt size={25} className="mr-2" />
                            )}
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
                        {/* <button
                          onClick={handleExamStart}
                          // disabled={!areAllPermissionsGranted}
                          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Start Exams
                        </button> */}

                        {currentQuestionIndex < questionsLength - 1 ? (
                          <button
                            onClick={ isTimeOut ? handleNextQuestion : handleSubmitAnswer}
                            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            onClick={handleExamEnd}
                            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            Finish
                          </button>
                        )}
                        
                      
                      </div>
                      {loading && <div className="progress-bar mt-4" style={{ width: `${progress}%` }} />}
                      {error && <div className="error mt-4 text-red-500">{error}</div>}
                      <ToastContainer />
                    </div>
                  }
                  {
                    !examStarted && 
                    <div className="flex items-center justify-center my-5 py-10 ">
                      <div className="space-y-8 w-5/6 bg-white p-8 ">
                        <div className="space-y-2 text-center">
                          <BrowserInstructions />
                          <p>Please check every box on the left befire starting your interview</p>
                          <button
                            onClick={handleExamStart}
                            // disabled={!areAllPermissionsGranted}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Start Exams
                          </button>
                        </div>
                      </div>
                      </div>
                  }
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default InterviewScreen;