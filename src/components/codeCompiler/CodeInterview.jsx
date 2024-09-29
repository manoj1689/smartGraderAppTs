import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
import CountdownTimer  from "./CountdownTimer"
// library

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sticky from "react-sticky-el";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
//icons

import { BiSolidError } from "react-icons/bi";

import { AiOutlineClose } from "react-icons/ai";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

// imported components

import BrowserInstructions from "../../components/Interview/BrowserInstructions";
import ErrorBoundary from "../../components/common/Error/ErrorBoundary";
import Checklist from "../../components/Interview/Checklist";
import CameraFeed from "../../components/Interview/CameraFeed";
import NotificationBar from "../../components/common/Notification/NotificationBar";
import CodingSection from "../codeCompiler/CodingSection";

// imported Services
import {
  examEnd,
  examStart,
  fetchSetQuestions,
  uploadScreenshot,
} from "../../services/api/InterviewService";
import { fetchSetDetail } from "../../services/api/SetService";
// imported Endpoints

import { MESSAGES } from "../../constants/Constants";

// import images

import SmartGrader from "../../assets/logos/smartGrader.png";
import { Button } from "@mui/material";

const InterviewScreen = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const { interview } = location.state || {};

  const [questionsData, setQuestionsData] = useState([]);
  const [setDetail, setSetDetails] = useState([]);
  const [questionsLength, setQuestionsLength] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examId, setExamId] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fullscreenRef = useRef(null);
  const { questionSetId } = useParams();

  const [transcript, setTranscript] = useState("");

  // Callback function to receive data from the child
  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  // fetching Question set Data
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
  }, []);

  useEffect(() => {
    const fetchSetData = async () => {
      try {
        if (interview?.id === 254) {
          const AIAvatarSetData = await fetchSetDetail(interview?.id);
          setAIAvatarSet(AIAvatarSetData);
        }
        const setData = await fetchSetDetail(interview?.id);
        setSetDetails(setData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSetData();
  }, []);

  // console.log("set Detail at coding interview Page", setDetail);
  // exam start
  const handleExamStart = async () => {
    setLoading(true);
    try {
      const response = await examStart(questionSetId, token);
      console.log("startExam details", response);
      setExamStarted(true);
      if (response.msg === "success") {
        setExamId(response.exam_id);
        // You can handle more logic here based on the response
      } else {
        setError(response.message || "Error starting the exam");
      }
    } catch (error) {
      setError("Error starting the exam");
    } finally {
      setLoading(false);
    }
  };

  // Exam end
  const handleExamEnd = async () => {
    setLoading(true);
    setExamStarted(false);
    try {
      //await handleSubmitAnswer();
      await examEnd(examId, token);

      setExamId("");
      setIsModalOpen(false);
      navigate(`/dashboard/question/exam-end`);
    } catch (error) {
      setError(MESSAGES.EXAM_END_ERROR);
    } finally {
      setLoading(false);
    }

    fullScreenExit();
  };
  //console.log("The Face Detection Result at interview Page",faceDetectionResults)
  // console.log("currentQuestion Id at interview Page",currentQuestion?.id)
  const [capturedImage, setCapturedImage] = useState(null);

  // Capture the screenshot and update the state
  const captureScreenshot = async () => {
    const img = await takeScreenshot(ref.current);
    setCapturedImage(img);
  };

  useEffect(() => {
    const saveAndUploadScreenshot = async () => {
      if (capturedImage && !examId) {
        // Convert the image to a Blob
        const blob = await fetch(capturedImage).then((res) => res.blob());

        // Create a FormData object
        const file = new FormData();
        file.append("file", blob, "screenshot.png");

        // Upload the image to your API
        try {
          const response = await uploadScreenshot(examId, token, file);
          console.log(response);
          console.log("Screenshot uploaded successfully");
        } catch (error) {
          console.error("Error uploading screenshot:", error);
        }
      }
    };

    saveAndUploadScreenshot();
  }, [capturedImage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      captureScreenshot();
    }, 60000); // 60 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once

  async function requestCameraAndMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
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

  const areAllPermissionsGranted =
    permissions.camera &&
    permissions.microphone &&
    permissions.fullscreen &&
    !permissions.devToolsOpen;

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

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="h-auto ">
        <div className="flex items-center justify-between border-b fixed top-0 z-10 w-full border-slate-200 bg-sky-100">
          <div className="w-auto p-4 ">
            <img src={SmartGrader} alt="Smart Grader" width={140} />
          </div>
        </div>
        <Sticky topOffset={80} className="fixed top-20 right-5 z-50">
          {isVisible && (
            <button
              className="bg-red-500 text-white rounded-full p-4 transition-transform hover:rotate-90 hover:scale-110 focus:outline-none"
              onClick={handleButtonClick}
            >
              <AiOutlineClose size={20} />
            </button>
          )}
        </Sticky>
        <Sticky topOffset={80} className="fixed top-10 right-10 z-50">
          {!isVisible && (
            <button
              className="bg-blue-400 text-white rounded-full p-4 transition-transform hover:rotate-90 hover:scale-110 focus:outline-none"
              onClick={enterFullscreen}
            >
              <AiOutlineClose size={20} />
            </button>
          )}
        </Sticky>

        <div ref={ref} className="container mx-auto max-sm:pt-80  " >
        <div className="max-sm:hidden mt-24">
            <NotificationBar />
          </div>
          <div className=" container mx-auto ">
            <ErrorBoundary>
              <div ref={fullscreenRef}>
                <div className="flex flex-col lg:flex-row gap-5 p-4 rounded-md border border-solid bg-white ">
                  <div className="w-full py-4 lg:w-1/3 ">
                    <div className="p-4 flex flex-col sm:flex-row bg-gray-200 rounded-lg  mb-4 justify-between">
                      <div>
                        <div className="text-xl font-spline font-bold text-slate-800">
                          {setDetail.title}
                        </div>
                        <div className="text-md font-spline font-medium text-gray-500">
                          {setDetail.description}
                        </div>
                      </div>
                      <div className="flex-row sm:flex-col gap-5">
                        <div className="text-md font-spline font-medium text-slate-800">
                          Level:{setDetail.level}
                        </div>
                        <div className="text-md font-spline font-medium text-blue-400">
                          No of Questions:{setDetail.questions_count}
                        </div>
                      </div>
                    </div>
                    <div className="flex relative max-sm:fixed max-sm:top-20 max-sm:left-2 max-sm:max-w-[250px] z-10 mx-auto ">
                      <div className="bg-black bg-opacity-50 max-sm:w-28 w-40 h-16 text-sm  lg:w-48 lg:h-28  lg:text-md p-4 lg:gap-2 flex  flex-col absolute z-10 ml-4 rounded-md shadow-md mt-4">
                        <div className="font-spline font-light">
                          {/* Face Verification Result */}
                          <div
                            className={`${
                              faceDetectionResults.faceVerified
                                ? "text-blue-300 font-medium max-sm:text-sm"
                                : "text-red-500 font-medium max-sm:text-sm"
                            }`}
                          >
                            {faceDetectionResults.faceVerified
                              ? "Verified"
                              : "Not Verified"}
                          </div>

                          {/* Face Count Detection, shown only if face is verified */}
                          {faceDetectionResults.faceVerified && (
                            <div
                              className={`${
                                faceDetectionResults.multiplePeopleDetected
                                  ? "text-red-500 font-medium max-sm:text-sm"
                                  : "text-blue-300 font-medium max-sm:text-sm"
                              }`}
                            >
                              {faceDetectionResults.multiplePeopleDetected
                                ? "Multi User"
                                : "Single User"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full ">
                        <CameraFeed
                          onFacesDetected={handleFacesDetected}
                          examStarted={
                            permissions.camera && permissions.microphone
                          }
                          examEnd={examEnd}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative z-1 lg:w-2/3">
                    {examStarted ? (
                      <>
                        <div className="flex flex-col sm:flex-row w-full  ">
                          {" "}
                          <div className="flex bg-gray-200  rounded-lg sm:w-2/3">
                            <div className="p-4"> 
                              <div className="text-xl font-spline font-bold ">
                                Assigment Questions
                              </div>
                              <div className="text-lg font-spline font-medium pt-2 ">
                              {questionsData[0].title}
                            </div>
                            </div>

                          
                          </div>
                          <div className="flex flex-col  rounded-lg  sm:w-1/3 px-4 justify-around items-center ">
                            <div className="  text-2xl text-sky-400 font-bold font-mono p-2 ">Time Left</div>
                            <div>
                              <CountdownTimer/>
                       
                            </div>
                          
                          </div>
                         
                        </div>

                        <div className="mt-4">
                            <CodingSection />
                            </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-8 w-full flex  flex-col bg-white p-4 ">
                          <div>
                            <BrowserInstructions />
                          </div>
                          <div>
                            <p>
                              Please check every box on the left before starting
                              your interview
                            </p>
                            <div></div>
                          </div>
                        </div>
                        <Checklist
                          items={[
                            {
                              label: "Camera Access",
                              isChecked: permissions.camera,
                            },
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
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  {!examStarted && (
                    <div className="flex flex-col justify-around">
                      <div className="space-y-2 text-center">
                        {questionsData.length === 0 ? (
                          <>
                            <div className="flex p-4 w-5/6 mx-auto gap-5 items-center">
                              <div className="w-1/2">
                                <button
                                  className="px-4  w-full text-lg font-spline flex justify-center items-center gap-3  font-medium text-white cursor-pointer bg-gray-500 hover:bg-gray-600  p-4 rounded "
                                  onClick={() => {
                                    navigate(`/dashboard`), fullScreenExit();
                                  }}
                                >
                                  <span>
                                    <IoMdArrowRoundBack />
                                  </span>{" "}
                                  <span>DashBoard</span>
                                </button>
                              </div>

                              <div className="w-1/2">
                                <p className="text-red-500 font-semibold">
                                  The selected question set does not have
                                  questions in it, please contact the
                                  interviewer !
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex w-5/6 mx-auto max-sm:flex-col justify-between gap-5  py-4">
                            <button
                              className="px-4  w-full text-lg font-spline flex justify-center items-center gap-3  font-medium text-white cursor-pointer bg-gray-500 hover:bg-gray-600  p-4 rounded "
                              onClick={() => {
                                navigate(`/dashboard`), fullScreenExit();
                              }}
                            >
                              <span>
                                <IoMdArrowRoundBack />
                              </span>{" "}
                              <span>Go back</span>
                            </button>
                            <button
                              onClick={handleExamStart}
                              disabled={!areAllPermissionsGranted}
                              className="px-4  w-full text-lg font-spline flex justify-center items-center gap-3  font-medium text-white cursor-pointer bg-sky-500 hover:bg-sky-600  p-4 rounded  "
                            >
                              <span>Start Exam</span>{" "}
                              <span>
                                <IoMdArrowRoundForward />
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ErrorBoundary>
          </div>
        </div>
        {/* <button style={{ marginBottom: "10px" }} onClick={captureScreenshot}>
          Take screenshot
        </button>

        <img width={240} src={image} alt={"Screenshot"} /> */}
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
        <div className=" w-80 sm:w-96">
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
                onClick={handleModalClose}
                className="bg-gray-400 text-white w-full px-4 py-2 rounded hover:bg-gray-500 focus:outline-none"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleExamEnd(), fullScreenExit();
                }}
                className="bg-blue-400 text-white w-full px-4 py-2 rounded hover:bg-blue-400 focus:outline-none"
              >
                Yes
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
        <div className="flex bg-blue-400 text-white justify-center items-center p-10 w-80 sm:w-96">
          {" "}
          <BiSolidError size={80} color="white" />{" "}
        </div>
        <h2 className="my-5 font-spline text-gray-700">
          Please enter fullscreen mode to conduct the exam
        </h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => {
              handleExamEnd(), fullScreenExit();
            }}
            className="bg-gray-400 w-full text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none"
          >
            No
          </button>
          <button
            onClick={handleEnterFullscreen}
            className="bg-blue-400 w-full text-white px-4 py-2 rounded hover:bg-blue-500 focus:outline-none"
          >
            Yes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default InterviewScreen;
