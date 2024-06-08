import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaVolumeUp, FaMicrophoneAlt, FaMicrophoneAltSlash } from "react-icons/fa";
import CameraFeed from "../components/Interview/CameraFeed";
import BrowserInstructions from "../components/Interview/BrowserInstructions";
import Checklist from "../components/Interview/Checklist";
import QuestionDisplay from "../components/Interview/QuestionDisplay";
import SpeechToText from "../components/Interview/SpeechToText";
import AnswerField from "../components/Interview/AnswerField";
import SubmitButton from "../components/Interview/SubmitButton";
import useFullscreen from "../components/Interview/CheatingPrevention/useFullscreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import { GiSoundWaves } from "react-icons/gi";
import { CiMicrophoneOn } from "react-icons/ci";
import InterviewService from "../services/api/InterviewService";
import { MESSAGES } from "../constants/Constants.ts";

const InterviewScreen = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
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

  const id = "1"; // Replace with your actual set_id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage
        const questions = await InterviewService.fetchQuestions(id, token);
        setQuestionsData(questions);
        console.log("Questions fetched:", questions);
      } catch (error) {
        console.error(error.message);
        toast.error(MESSAGES.FETCH_QUESTION_ERROR);
      }
    };
    fetchData();
  }, [id]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setProgress(30);

    try {
      const response = await InterviewService.submitAnswer(
        questionsData[currentQuestionIndex].title,
        answer,
        "Advanced"
      );
      console.log("Answer submitted:", response);
      setError(null);
      setProgress(100);
      handleNextQuestion();
      setAnswer(""); // Clear the answer field
    } catch (err) {
      console.error(err.message);
      setError(MESSAGES.SUBMIT_ANSWER_ERROR);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  }, [answer, currentQuestionIndex, handleNextQuestion, questionsData]);

  const currentQuestion = questionsData[currentQuestionIndex];
  console.log(currentQuestion);

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

  const updateTranscript = useCallback((newTranscript) => {
    setAnswer((prevAnswer) => prevAnswer + newTranscript);
  }, []);

  const handleAnswerChange = useCallback((event) => {
    setAnswer(event.target.value);
  }, []);

  const toggleListening = () => {
    setIsRecording((prevIsRecording) => !prevIsRecording);
  };

  useFullscreen(true); // Ensure fullscreen button is shown by default

  if (!questionsData.length) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div ref={fullscreenRef} className="container mx-auto flex h-screen bg-gray-100">
        <div className="flex flex-col basis-1/3 p-4 bg-white shadow-lg">
          <div className="mt-5">
            <CameraFeed onFacesDetected={handleFacesDetected} />
          </div>
          <div className="mt-4">
            <BrowserInstructions />
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
          </div>
        </div>
        <div className="flex flex-col basis-2/3 py-5">
          <div className="p-8 space-y-4">
            <div className="w-full text-xl font-semibold leading-6 text-neutral-700">
              Question {currentQuestion.id}
            </div>
            <div className="flex flex-col md:flex-row text-base leading-5 text-neutral-600 gap-2.5 justify-between px-4 py-4 mt-2.5 w-full rounded-md border border-solid border-neutral-500">
              <QuestionDisplay
                questionText={currentQuestion ? currentQuestion.title : "Loading question..."}
              />
              <div className="flex items-center px-4 rounded">
                <span>
                  <GiSoundWaves size={35} color="01AFF4" />
                </span>
                <span>
                  <GiSoundWaves size={35} color="01AFF4" />
                </span>
              </div>
            </div>
            <div className="relative">
              <AnswerField
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Type your answer here..."
                charLimit={500}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                <CiMicrophoneOn size={35} />
              </div>
            </div>
            <SpeechToText
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
              onTranscriptUpdate={updateTranscript}
            />
            <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
              <button
                onClick={toggleFullscreen}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {permissions.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              </button>
              <button
                onClick={() => speak(currentQuestion.title)}
                disabled={ttsPlaying}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <FaVolumeUp className="mr-2" />
                Replay Question
              </button>
              <button
                onClick={toggleListening}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-700'
                }`}
              >
                {isRecording ? (
                  <>
                    <FaMicrophoneAltSlash size={25} className="mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <FaMicrophoneAlt size={25} className="mr-2" />
                    Start Recording
                  </>
                )}
              </button>
              <SubmitButton
                onClick={handleSubmit}
                className="flex-1"
                disabled={!answer.trim() || !permissions.camera || !permissions.microphone}
              />
              <button
                onClick={handleNextQuestion}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Next
              </button>
            </div>
            {loading && <div className="progress-bar mt-4" style={{ width: `${progress}%` }} />}
            {error && <div className="error mt-4 text-red-500">{error}</div>}
            <ToastContainer />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default InterviewScreen;
