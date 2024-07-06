import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaMicrophoneAlt, FaMicrophoneAltSlash } from "react-icons/fa";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate,useLocation } from "react-router-dom";
import { BiSolidError } from "react-icons/bi";
import AnswerField from "../components/Interview/AnswerField";
import Checklist from "../components/Interview/Checklist";
import CameraFeed from "../components/Interview/CameraFeed";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import useFullscreen from "../components/Interview/CheatingPrevention/useFullscreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import { GiSoundWaves } from "react-icons/gi";
import QuestionDisplay from "../components/Interview/QuestionDisplay";
import BrowserInstructions from "../components/Interview/BrowserInstructions";
import { HiSpeakerWave } from "react-icons/hi2";
import Checkbox from "react-custom-checkbox";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import {
  examEnd,
  examStart,
  fetchSetQuestions,
  submitAnswer,
} from "../services/api/InterviewService";
import {fetchSetDetail} from "../services/api/SetService"
import { GiCheckMark } from "react-icons/gi";
import { MESSAGES } from "../constants/Constants";
import NotificationBar from "../components/common/Notification/NotificationBar";
import { useParams } from "react-router-dom";
import Sticky from "react-sticky-el";


const InterviewScreen = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [setDetail,setSetDetails]=useState()
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
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const {
    transcript: liveTranscript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
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

  const location = useLocation();
  const { interview } = location.state || {};


  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const questionsData = await fetchSetQuestions(questionSetId, token);
        setQuestionsData(questionsData);
        setQuestionsLength(questionsData.length);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchQuestionsData();

    const fetchSetData = async () => {
      try {
        const setData = await fetchSetDetail(interview?.id);
        setSetDetails(setData)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSetData();

    
   
  }, []);

  const handleSubmitAnswer = async () => {
    setLoading(true);
    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000);
    try {
      await submitAnswer(
        currentQuestion?.id,
        questionSetId,
        duration,
        answer,
        token
      );
      if (!isTimeOut) {
        handleNextQuestion();
      }
      setAnswer("");
    } catch (error) {
      setError(MESSAGES.SUBMIT_ANSWER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswerWithoutNext = async () => {
    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000);
    try {
      await submitAnswer(
        currentQuestion?.id,
        questionSetId,
        duration,
        answer,
        token
      );
      setAnswer("");
    } catch (error) {
      setError(MESSAGES.SUBMIT_ANSWER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleExamStart = async () => {
    setLoading(true);
    try {
      await examStart(questionSetId, token);
      setExamStarted(true);
    } catch (error) {
      setError(MESSAGES.EXAM_STARTED_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleExamEnd = async () => {
    setLoading(true);
    try {
      await handleSubmitAnswer();
      await examEnd(questionSetId, token);
      setIsModalOpen(false);
      navigate(`/dashboard/question/exam-end`);
    } catch (error) {
      setError(MESSAGES.EXAM_END_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, []);

  const currentQuestion = questionsData[currentQuestionIndex];

  async function requestCameraAndMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
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
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Failed to enter fullscreen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Failed to exit fullscreen mode: ${err.message}`);
      });
    }
  }, []);

  const fullScreenExit = useCallback(() => {
    if (document.fullscreenElement) {
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

  const handleAnswerChange = useCallback(
    (event) => {
      if (listening) {
        stopListening();
      }
      setAnswer(event.target.value);
    },
    [listening]
  );

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (!listening) {
      setAnswer((prev) => `${prev} ${transcript}`.trim());
      setTranscript("");
      resetTranscript();
    } else {
      setTranscript(liveTranscript);
    }
  }, [listening, liveTranscript]);

  const areAllPermissionsGranted =
    permissions.camera &&
    permissions.microphone &&
    permissions.fullscreen &&
    !permissions.devToolsOpen;

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
            setIsTimeOut(true);
            handleSubmitAnswerWithoutNext(); // Auto-submit when time runs out
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [examStarted, currentQuestionIndex, questionsData]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const enterFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Failed to enter fullscreen mode: ${err.message}`);
        setIsFullscreenOpen(false);
        setIsVisible(false); // Show modal if fullscreen request fails
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Failed to exit fullscreen mode: ${err.message}`);
      });
    }
  }, []);

  const handleFullScreenClose = () => {
    setIsFullscreenOpen(false);
  };

  const handleEnterFullscreen = () => {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Failed to enter fullscreen mode: ${err.message}`);
    });
    setIsFullscreenOpen(false);
    setIsVisible(true);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenOpen(true);
        setIsVisible(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <Sticky topOffset={80} className="fixed top-10 right-10 z-50">
        {isVisible && (
          <button
            className="bg-red-500 text-white rounded-full p-4 transition-transform hover:rotate-90 hover:scale-110 focus:outline-none"
            onClick={handleButtonClick}
          >
            <AiOutlineClose size={30} />
          </button>
        )}
      </Sticky>
      <Sticky topOffset={80} className="fixed top-10 right-10 z-50">
        {!isVisible && (
          <button
            className="bg-blue-400 text-white rounded-full p-4 transition-transform hover:rotate-90 hover:scale-110 focus:outline-none"
            onClick={enterFullscreen}
          >
            <AiOutlineClose size={30} />
          </button>
        )}
      </Sticky>

      <div className="container lg:w-5/6 mx-auto w-full ">
        <NotificationBar />

        <div className="rounded-md border border-solid my-5 border-black border-opacity-10 bg-white">
          <ErrorBoundary>
            <div ref={fullscreenRef} className="container mx-auto flex  ">
              <div className="flex flex-col basis-1/3 rounded-md border border-solid m-5 border-black border-opacity-10">
                <div className="">
                  <CameraFeed
                    onFacesDetected={handleFacesDetected}
                    examStarted={examStarted}
                  />
                </div>

                <div className="mt-4">
                  <Checklist
                    items={[
                      { label: "Camera Access", isChecked: permissions.camera },
                      {
                        label: "Microphone Access",
                        isChecked: permissions.microphone,
                      },
                      {
                        label: "Fullscreen Mode",
                        isChecked: permissions.fullscreen,
                      },
                      {
                        label: "DevTools Closed",
                        isChecked: !permissions.devToolsOpen,
                      },
                    ]}
                  />
                  {/* <div
                    className={`flex  items-center space-x-2 mx-4 p-2 border rounded-md ${
                      permissions.fullscreen
                        ? "bg-green-100 border-green-300"
                        : "bg-red-100 border-red-300"
                    } `}
                  >
                    <Checkbox
                      icon={
                        permissions.fullscreen ? (
                          <GiCheckMark color="green" size={12} />
                        ) : (
                          ""
                        )
                      }
                      checked={permissions.fullscreen}
                      onChange={fullScreenExit}
                      borderRadius={3}
                      size={24}
                      style={{ marginLeft: "auto" }}
                    />
                    <div className=" text-sm font-medium ">
                      {permissions.fullscreen
                        ? "Exit Fullscreen"
                        : "Enter Fullscreen"}
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-col basis-2/3 rounded-md border border-solid my-5 mr-5 border-black border-opacity-10">
                {examStarted && (
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between p-4 border-b border-solid border-black border-opacity-10 my-5 mr-5">
                      <span className="text-xl text-neutral-700 font-spline font-semibold">
                       {setDetail.title}
                      </span>
                      <div className="text-right">
                        <p className="text-base text-neutral-600">
                          Time left:{" "}
                          <span className="font-bold">{remainingTime}</span>{" "}
                          seconds
                        </p>
                      </div>
                    </div>
                    <div className="w-full text-lg font-semibold leading-6 text-neutral-700">
                      Question {currentQuestion?.id}
                      <span className="text-xs text-neutral-600">
                        {" "}
                        (Click the waves icon to listen to question)
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row text-base leading-5 text-neutral-600 gap-2.5 justify-between px-4 py-4 mt-2.5 w-full rounded-md border border-solid border-neutral-500">
                      <QuestionDisplay
                        questionText={
                          currentQuestion
                            ? currentQuestion.title
                            : "Loading question..."
                        }
                      />
                      <div className="flex items-center px-4 rounded">
                        <span
                          onClick={() => speak(currentQuestion.title)}
                          className="cursor-pointer"
                        >
                          <HiSpeakerWave size={29} />
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <AnswerField
                        value={answer + (listening ? ` ${transcript}` : "")}
                        onChange={handleAnswerChange}
                        placeholder="Type your answer here..."
                        charLimit={500}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        disabled={isTimeOut}
                      />
                      <div
                        className={`absolute bottom-10 left-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer ${
                          listening
                            ? "text-red-500 hover:text-gray-700"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => {
                          if (!isTimeOut) {
                            listening ? stopListening() : startListening();
                          }
                        }}
                      >
                        {listening ? (
                          <FaMicrophoneAlt
                            size={25}
                            color="green"
                            className="mr-2"
                          />
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
                          onClick={
                            isTimeOut ? handleNextQuestion : handleSubmitAnswer
                          }
                          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                        onClick={() => {
                          handleExamEnd(), fullScreenExit();
                        }}
                          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Finish
                        </button>
                      )}
                    </div>
                    {loading && (
                      <div
                        className="progress-bar mt-4"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {error && (
                      <div className="error mt-4 text-red-500">{error}</div>
                    )}
                    <ToastContainer />
                  </div>
                )}
                {!examStarted && (
                  <div className="flex items-center justify-center my-5 py-10 ">
                    <div className="space-y-8 w-5/6 bg-white p-8 ">
                      <div className="space-y-2 text-center">
                        <BrowserInstructions />
                        <p>
                          Please check every box on the left befire starting
                          your interview
                        </p>
                        {questionsData.length === 0 ? (
                          <>
                            <p>
                              The selected question set does not have questions
                              in it, please contact the interviewer
                            </p>
                            <button
                              type="button"
                              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-blue-600"
                              onClick={() => navigate(`/dashboard`)}
                            >
                              Dashboard
                            </button>
                          </>
                        ) : (
                          <div className="flex w-10/12 mx-auto py-10">
                            <button
                              type="button"
                              className="px-4 py-4 w-full  lg:w-1/2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-3"
                              onClick={() => navigate(`/dashboard`)}
                            >
                              Go back
                            </button>
                            <button
                              onClick={handleExamStart}
                              disabled={!areAllPermissionsGranted}
                              className="px-4 py-4 bg-blue-500 w-full lg:w-1/2 text-white rounded hover:bg-blue-600"
                            >
                              Start Exams
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ErrorBoundary>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            zIndex: 21,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <div className="w-80 sm:w-96">
          <span className="text-xl text-gray-600 font-spline font-semibold py-2 ">
            Quit Exam
          </span>
          <div className="shrink-0 mt-3.5 h-px border border-solid  bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
          <div className="gap-2 py-5">
            <p>
              <span className="text-lg text-gray-700 font-spline font-medium">
                Are you sure you want to end the exam?
              </span>
            </p>

            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleExamEnd(), fullScreenExit();
                }}
                className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                Yes
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white w-full px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isFullscreenOpen}
        onRequestClose={handleFullScreenClose}
        shouldCloseOnOverlayClick={false} 
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            zIndex: 21,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div className="flex bg-blue-400 text-white justify-center items-center p-10">
          {" "}
          <BiSolidError size={80} color="white" />{" "}
        </div>
        <h2 className="my-5 font-spline text-gray-700">
          Please enter fullscreen mode to conduct the exam
        </h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleEnterFullscreen}
            className="bg-blue-400 w-full text-white px-4 py-2 rounded hover:bg-blue-500 focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={() => {
              handleFullScreenClose(), navigate(`/dashboard`);
            }}
            className="bg-gray-400 w-full text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none"
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default InterviewScreen;
