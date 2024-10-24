import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
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
import { RiFullscreenExitLine } from "react-icons/ri";
import { RiFullscreenLine } from "react-icons/ri";
import { MdCallEnd } from "react-icons/md";
import { PiChatSlashFill } from "react-icons/pi";
import { PiChatFill } from "react-icons/pi";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaBell } from "react-icons/fa";
// imported components

import BrowserInstructions from "../components/Interview/BrowserInstructions";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import Checklist from "../components/Interview/Checklist";
import CameraFeed from "../components/Interview/CameraFeed";
import { fetchUserData } from "../services/api/NotificationBarService";
import { getToken } from "../utils/tokenUtils";

import AIChat from "../components/Interview/AIChat";

//Avatar images
import FemaleAvatar from "../assets/images/Avatar/femaleAi.jpeg";
import AiFemaleAssistant from "../assets/images/Avatar/AiFemaleAssistant.webp";
import FemaleUsAvatar from "../assets/images/Avatar/femaleUsAi.jpeg";
import MaleUsAvatar from "../assets/images/Avatar/MaleUsAi.jpeg";

// imported Services
import {
  examEnd,
  examStart,
  fetchSetQuestions,
  uploadScreenshot,
} from "../services/api/InterviewService";
import { fetchSetDetail } from "../services/api/SetService";
// imported Endpoints

import { MESSAGES } from "../constants/Constants";

// import images

import SmartGrader from "../assets/logos/smartGrader.png";
import { Button } from "@mui/material";

const InterviewScreen = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const { interview } = location.state || {};
  const [username, setUsername] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [setDetail, setSetDetails] = useState([]);
  const [questionsLength, setQuestionsLength] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examId, setExamId] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [showAvatarList, setShowAvatarList] = useState(true);
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
  const [showTranscript, setShowTranscript] = useState(true);
  const [disableSpeech, setDisableSpeech] = useState(false);
  const avatarListRef = useRef(null);
  const [selectedAvatar, setSelectedAvatar] = useState("Ava");
  const [capturedImage, setCapturedImage] = useState(null);
  const avatars = [
    { name: "Ava", src: FemaleAvatar },
    { name: "Jack", src: MaleUsAvatar },
    { name: "Luna", src: FemaleUsAvatar },
    { name: "Zara", src: AiFemaleAssistant },
  ];
  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      fetchUserData(accessToken).then((data) => {
        if (data && data.is_verified === 1) {
          setUsername(data.name);
          //console.log(data)
        }
      });
    } else {
      console.error("Access token not found in local storage");
    }
  }, []);


  useEffect(() => {
    // Set default avatar on component mount
    setSelectedAvatar("Ava");
  }, []); // Empty dependency array to run only once on mount

  const handleAvatarSelect = (avatarName) => {
    if (!examStarted) {
      setSelectedAvatar(avatarName); // Only allow selection if exam hasn't started
    }
  };

  // console.log(selectedAvatar)

  const handleAvatarShow = () => {
    setShowAvatarList(!showAvatarList);

    // Scroll to the right on button click when the list is shown
    if (!showAvatarList) {
      setTimeout(() => {
        avatarListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        });
      }, 100); // Timeout to ensure that the list is rendered before scrolling
    }
  };
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
  // console.log("set Detail at interview Page", setDetail);
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

  // const handleCoding=()=>{
  //   navigate(`/dashboard/question/codingsection/${interview?.id}`, {
  //     state: { interview }
  //   });
  // }

  // Exam end
const handleExamEnd = async () => {
  setLoading(true);
  setExamStarted(false);

  try {
    //await handleSubmitAnswer();
    await examEnd(examId, token);

    setExamId("");
    setIsModalOpen(false);

    // Conditional navigation based on the username
    if (username === "guest") {
      navigate("/dashboard/question/exam-end");
    } else {
      navigate(`/dashboard/result`, { state: { exam_id: examId } });
    }

  } catch (error) {
    setError(MESSAGES.EXAM_END_ERROR);
  } finally {
    setLoading(false);
  }

  fullScreenExit();
};

  //console.log("The Face Detection Result at interview Page",faceDetectionResults)
  // console.log("currentQuestion Id at interview Page",currentQuestion?.id)
 

  // Capture the screenshot and update the state
  const captureScreenshot = async () => {
    const img = await takeScreenshot(ref.current);
    console.log("image captured");
    setCapturedImage(img);
  };

  useEffect(() => {
    const saveAndUploadScreenshot = async () => {
      if (capturedImage && examId) {
        // Ensure examId is available
        try {
          // Convert the image to a Blob
          const blob = await fetch(capturedImage).then((res) => res.blob());

          // Create a FormData object
          const file = new FormData();
          file.append("file", blob, "screenshot.png");

          // Upload the image to your API
          const response = await uploadScreenshot(examId, token, file);
          console.log(response);
          console.log("Screenshot uploaded successfully");
        } catch (error) {
          console.error("Error uploading screenshot:", error);
        }
      }
    };

    saveAndUploadScreenshot();
  }, [capturedImage, examId]); // Add examId to dependency array to watch for changes

  useEffect(() => {
    const intervalId = setInterval(() => {
      captureScreenshot(); // Capture screenshot every 40 seconds
    }, 40000); // 40 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once

  async function requestCameraAndMicrophone() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // Enable video if you need camera permissions
        audio: true,
      });

      setPermissions((prev) => ({
        ...prev,
        camera: true,
        microphone: true,
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
      <div className="flex">
        <div className="flex items-center  justify-between border-b  w-full fixed top-0 z-50  border-slate-300 bg-white">
          <div className="w-full flex justify-between p-4 ">
            <img
              src={SmartGrader}
              alt="Smart Grader"
              className="max-sm:w-28 sm:w-40"
            />
            <div className="sm:hidden mr-8">
              <FaBell size={30} color="#01AFF4" />
            </div>
          </div>
        </div>

        <div>
          {/* {image &&<>
    <img width={400} height={400} src={image} alt={'Screenshot'} />
  </>} */}
        </div>
        <div ref={ref} className="container mx-auto">
          <div className="mt-12 sm:mt-16 md:mt-20">
            <ErrorBoundary>
              <div ref={fullscreenRef}>
                <div className="flex flex-col lg:flex-row gap-5 p-4  bg-white ">
                  <div className="w-full  lg:w-3/5 rounded-md  ">
                    <div className="max-sm:px-2 sm:px-4 flex w-full p-2">
                      <div className="flex flex-col w-full gap-1">
                        <div className="max-sm:text-sm text-xl font-spline font-bold text-sky-500">
                          {setDetail.title}
                        </div>
                        <div className="max-sm:text-sm text-md font-spline font-medium text-gray-500">
                          {setDetail.description}
                        </div>
                      </div>
                      <div className="flex flex-row gap-1 w-full ">
                        <div className="flex w-full justify-center items-center  bg-sky-400 flex-row   sm:flex-col p-2 rounded-lg ">
                         <div className="max-sm:text-sm text-lg   font-medium text-white "> Level</div> <div className="text-xl font-extralight text-white">{setDetail.level}</div>
                        </div>
                        <div className="flex w-full justify-center items-center flex-row sm:flex-col bg-gray-200 p-2 rounded-lg">
                        <div className="max-sm:text-xs text-lg font-bold text-sky-500">Questions</div> <div className="text-2xl text-green-500 font-bold" >{setDetail.questions_count}</div>  
                        </div>
                      </div>
                    </div>
                    <div className="flex relative  ">
                      <div className="bg-black bg-opacity-50 w-40 h-24 text-sm  lg:w-48 lg:h-28  lg:text-md p-4 lg:gap-2 flex  flex-col absolute z-10 ml-4 lg:ml-12  rounded-md shadow-md mt-4">
                        <div className="font-spline font-light">
                          {/* Face Verification Result */}
                          <div
                            className={`${
                              faceDetectionResults.faceVerified
                                ? "text-blue-300 font-medium"
                                : "text-red-500 font-medium"
                            }`}
                          >
                            {faceDetectionResults.faceVerified
                              ? "Face Verified"
                              : "Face Not Verified"}
                          </div>

                          {/* Face Count Detection, shown only if face is verified */}
                          {faceDetectionResults.faceVerified && (
                            <div
                              className={`${
                                faceDetectionResults.multiplePeopleDetected
                                  ? "text-red-500 font-medium"
                                  : "text-blue-300 font-medium"
                              }`}
                            >
                              {faceDetectionResults.multiplePeopleDetected
                                ? "Multi Faces Detected"
                                : "Single Face Detected"}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex bg-opacity-50 w-40  text-sm h-full right-0 lg:text-md absolute z-10 justify-end">
                        {showAvatarList && (
                          <div className="flex flex-col my-auto gap-4 max-sm:h-60 h-80 lg:h-full overflow-y-auto p-2 mr-4 rounded-lg bg-gray-300 bg-opacity-50">
                            <div className="text-slate-700 flex justify-center">
                              Ai Interviewer
                            </div>

                            {/* Avatar Options */}
                            {avatars.map((avatar) => (
                              <div
                                key={avatar.name}
                                onClick={() => handleAvatarSelect(avatar.name)}
                                className={`flex flex-col items-center ${
                                  examStarted
                                    ? " cursor-not-allowed"
                                    : "cursor-pointer"
                                } ${
                                  selectedAvatar === avatar.name ||
                                  (avatar.name === "Ava" &&
                                    selectedAvatar === "Ava")
                                    ? "bg-gray-200"
                                    : ""
                                } p-2 rounded-xl`}
                              >
                                <img
                                  src={avatar.src}
                                  alt={avatar.name}
                                  className="rounded-xl shadow-lg"
                                />
                                <div className="mt-2 text-center">
                                  {avatar.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-center items-center">
                          <button
                            onClick={handleAvatarShow}
                            className="py-8 bg-white shadow-lg rounded-full"
                          >
                            {showAvatarList ? (
                              <IoMdArrowDropright size={20} />
                            ) : (
                              <IoMdArrowDropleft size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="relative mx-auto w-full px-2  ">
                        <CameraFeed
                          onFacesDetected={handleFacesDetected}
                          examStarted={
                            permissions.camera && permissions.microphone
                          }
                          examEnd={examEnd}
                        />
                      </div>
                    </div>
                    {examStarted && showTranscript ? (
                      <div className="max-sm:hidden border border-gray-300 bg-white bg-opacity-70 shadow-lg rounded-lg mt-4 p-4">
                        <p>
                          <span className="font-semibold text-sky-400">
                            Speech Text -
                          </span>{" "}
                          {transcript}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="flex w-full h-auto gap-8 justify-center items-center pt-8">
               

                      <div className="flex flex-col gap-2 justify-center items-center ">
                        <div>
                          <button
                            className="p-2 md:p-4  bg-red-500 rounded-full"
                            onClick={() => setShowTranscript(!showTranscript)}
                          >
                            {!showTranscript ? (
                              <PiChatFill
                                className="text-xl sm:text-2xl md:text-4xl"
                                color="white"
                              />
                            ) : (
                              <PiChatSlashFill
                                className="text-xl sm:text-2xl md:text-4xl"
                                color="white"
                              />
                            )}
                          </button>
                        </div>
                        <div className="flex text-gray-600 max-md:text-sm md:text-md  text-center">
                          {!showTranscript ? "Transcript" : "Hide Transcript "}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 justify-center items-center">
                        <div>
                          {!isVisible ? (
                            <button
                              className="p-2 md:p-4 bg-gray-500 text-gray-200 rounded-full"
                              disabled
                            >
                              <RiFullscreenLine
                                className="text-xl sm:text-2xl md:text-4xl"
                                color="white"
                              />
                            </button>
                          ) : (
                            <button
                              className="p-2 md:p-4 bg-sky-400 rounded-full cursor-pointer"
                              onClick={enterFullscreen}
                            >
                              <RiFullscreenExitLine
                                className="text-xl sm:text-2xl md:text-4xl"
                                color="white"
                              />
                            </button>
                          )}
                        </div>
                        <div className="text-gray-600  max-md:text-sm md:text-md text-center">
                          {!isVisible ? "Full Screen" : "Exit Fullscreen"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 justify-center items-center">
                        <div>
                          <button
                            className="p-2 md:p-4  bg-red-500 rounded-full"
                            onClick={handleButtonClick}
                          >
                            <MdCallEnd
                              className="text-xl sm:text-2xl md:text-4xl"
                              color="white"
                            />
                          </button>
                        </div>
                        <div className="text-gray-600 max-md:text-sm md:text-md text-center">
                          End Exam
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full  lg:w-2/5 flex flex-col p-4  shadow-gray-200 rounded-2xl"
                    style={{ boxShadow: "-6px 6px 12px rgba(0, 0, 0, 0.3)" }}
                  >
                    {examStarted ? (
                      <div>
                        <AIChat
                          questionList={questionsData}
                          handleExamEnd={handleExamEnd}
                          examID={examId}
                          onTranscriptChange={handleTranscriptChange}
                          selectedAvatar={selectedAvatar}
                        />
                        {/* <div className="flex w-full justify-end ">
                        <button onClick={handleCoding} className="my-4 py-4 px-8 bg-sky-400 rounded-md hover:bg-sky-600">start Coding Round</button>
                        </div> */}
                        {/* <button style={{ marginBottom: '10px' }} onClick={getImage}>
          Take screenshot
        </button> */}

                        {error && (
                          <div className="error mt-4 text-red-500">{error}</div>
                        )}
                        <ToastContainer />
                      </div>
                    ) : (
                      <>
                        <div className=" w-full flex  flex-col bg-white  ">
                          <div className="flex w-full text-lg lg:text-2xl text-[#01AFF4] font-bold justify-center items-center">
                            Smart Grader Ai Assistant
                          </div>
                          <div>
                            <BrowserInstructions />
                          </div>
                          <div className="p-4 max-sm:hidden text-sm sm:text-lg text-[#01AFF4] font-sans">
                            <p>
                              Please check every box on the left before starting
                              your interview
                            </p>
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

                    <div className="flex flex-col ">
                      {!examStarted && (
                        <div className="flex flex-col justify-around">
                          <div className="space-y-2 text-center">
                            {questionsData.length === 0 ? (
                              <>
                                <div className="flex p-4 w-5/6 mx-auto gap-5 items-center">
                                  <div className="w-1/2">
                                    <button
                                      className="px-4  w-full  max-sm:text-sm text-lg font-spline flex justify-center items-center gap-3  font-medium text-white cursor-pointer bg-gray-500 hover:bg-gray-600 p-2 sm:p-4 rounded "
                                      onClick={() => {
                                        navigate(`/dashboard`),
                                          fullScreenExit();
                                      }}
                                    >
                                      <span>
                                        <IoMdArrowRoundBack />
                                      </span>{" "}
                                      <span>DashBoard</span>
                                    </button>
                                  </div>

                                  <div className="w-1/2 max-sm:text-sm">
                                    <p className="text-red-500 font-semibold">
                                      The selected question set does not have
                                      questions in it, please contact the
                                      interviewer !
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-5/6 mx-auto flex-col justify-center items-center gap-5 py-4">
                                <div>
                                  <button
                                    onClick={handleExamStart}
                                    disabled={!areAllPermissionsGranted}
                                    className="px-8 py-4 max-sm:text-sm text-lg font-spline flex justify-center items-center gap-3  font-medium text-white cursor-pointer bg-sky-500 hover:bg-sky-600  rounded-full  "
                                  >
                                    <span>Start Exam</span>{" "}
                                    <span>
                                      <IoMdArrowRoundForward />
                                    </span>
                                  </button>
                                </div>

                                <button
                                  className="px-4  w-full max-sm:text-sm text-lg font-spline flex justify-center items-center gap-3  font-semibold text-sky-400 cursor-pointer bg-white hover:text-sky-500  "
                                  onClick={() => {
                                    navigate(`/dashboard`), fullScreenExit();
                                  }}
                                >
                                  <span>
                                    <IoMdArrowRoundBack />
                                  </span>{" "}
                                  <span>Go back</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
