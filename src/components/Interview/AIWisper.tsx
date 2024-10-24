import React, { useState, useRef, useEffect } from "react";
import bowser from 'bowser';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { useUserId } from "../../context/userId";
import { toast } from "react-toastify";
import {
  getChatbotResponse,
  explainChatbotResponse,
} from "../../services/api/OpenaiService.js";
import { OpenAI } from "openai";
import Assistant from "../../assets/AssistantAi.png";
import { submitAnswer } from "../../services/api/InterviewService";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
//@ts-ignore
import WaveEffect from "../Interview/WaveEffect.jsx";
import Speech from "speak-tts";
import { IoMdMic } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
//Avatar images
import FemaleAvatar from "../../assets/images/Avatar/femaleAi.jpeg";
import AiFemaleAssistant from "../../assets/images/Avatar/AiFemaleAssistant.webp";
import FemaleUsAvatar from "../../assets/images/Avatar/femaleUsAi.jpeg";
import MaleUsAvatar from "../../assets/images/Avatar/MaleUsAi.jpeg";
interface Question {
  id: number;
  title: string;
  description: string;
  type: number;
  duration: number;
}

interface AIChatProps {
  questionList: Question[];
  handleExamEnd: () => void;
  examID: string;
  onTranscriptChange: (transcript: string) => void;
  selectedAvatar:string;
}

type MessageRole = "system" | "user" | "assistant";

interface Message {
  role: MessageRole;
  content: string;
}

const AIChat: React.FC<AIChatProps> = ({
  questionList,
  handleExamEnd,
  examID,
  onTranscriptChange,
  selectedAvatar
}) => {
  const [assistantAI, setAssistantAI] = useState<Message[]>([]);
  const [userResponse, setUserResponse] = useState<Message[]>([]);
  const [interviewQuestion, setInterviewQuestion] = useState<Message[]>([]);
  const [assistantAlert, setAssistantAlert] = useState<Message[]>([]);
  const [audioTranscript, setAudioTranscript] = useState("");
  const [transcriptAi, setTranscriptAi] = useState("");
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionNumber, setquestionNumber] = useState(0);
  const [listeningEnabled, setListeningEnabled] = useState(true);
  const [showWave, setShowWave] = useState(false);
  const [selectedAvatarlogo,setSelectedAvatarlogo]=useState<any>("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { selectedUserId } = useUserId();
  const userId = selectedUserId;
  const [noResponse, setNoResponse] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [speechData, setSpeechData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const visualizerRef = useRef<HTMLCanvasElement>(null);
  console.log("selected Avatar",selectedAvatar)
  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Use environment variable
    dangerouslyAllowBrowser: true,
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  //  console.log("recorded blob direct",recordingBlob)
  const continueListening = () => {
    if (listeningEnabled) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    }
  };

  const questionId = questionList[currentQuestionIndex]?.id;
  const browser = bowser.getParser(window.navigator.userAgent);
  const browserName = browser.getBrowserName();
  //  // Initialize Speech
  const speech = new Speech();
  const avatars = [
    {
      name: "Ava",
      src: FemaleAvatar ,
      voice: {
        chrome: 'Google UK English Female',
        safari: 'com.apple.speech.synthesis.voice.daniel', // English (UK)
        edge: 'Microsoft Libby Online (Natural) - English (United Kingdom)', // Edge (US English Female)
      },
    },
    {
      name: "Jack",
      src: MaleUsAvatar, 
      voice: {
        chrome: 'Google UK English Male',
        safari: 'com.apple.speech.synthesis.voice.daniel', // English (UK)
        edge: 'Microsoft Ryan Online (Natural) - English (United Kingdom)', // Edge (US English Male)
      },
    },
    {
      name: "Luna",
      src: FemaleUsAvatar,
      voice: {
        chrome: 'Google US English',
        safari: 'com.apple.speech.synthesis.voice.siri', // English (US)
        edge: 'Microsoft Sonia Online (Natural) - English (United Kingdom)', // Edge (US English Female)
      },
    },
    {
      name: "Zara",
      src: AiFemaleAssistant,
      voice: {
        chrome: 'Google Deutsch',
        safari: 'com.apple.speech.synthesis.voice.jorge', // Spanish (Spain)
        edge: 'Microsoft Jenny Online (Natural) - English (United States)'//Microsoft Eric Online (Natural) - English (United States) 
       
      },
    },
  ];
  
  useEffect(() => {
    // Initialize Speech with configuration
    const avatar = avatars.find((av) => av.name === selectedAvatar); // Find the selected avatar
     setSelectedAvatarlogo(avatar?.src)
    if (!avatar) {
      console.error("Selected avatar not found");
      return;
    }
    
    let selectedVoice = avatar.voice.chrome; // Default to Chrome voice
    
    
    if (browserName === "Safari") {
      selectedVoice = avatar.voice.safari;
    } else if (browserName === "Microsoft Edge") {
      selectedVoice = avatar.voice.edge;
    }
  
    speech
      .init({
        volume: 1,
        lang: "en-In",
        rate: 1,
        pitch: 1,
        voice: selectedVoice,
        splitSentences: true,
      })
      .then((data) => {
        console.log("Speech is ready, voices available:", data.voices);
        setSpeechData(speech);
      })
      .catch((e) => {
        console.error("An error occurred while initializing:", e);
      });
  }, [ browserName]); // Add selectedAvatar and browserName to the dependency array
  
  useEffect(() => {
    const initialMessage: Message = {
      role: "assistant",
      content:
        "Welcome to SmartGrader. Introduce yourself, and then provide an overview of your professional journey and expertise.",
    };

    setAssistantAlert([initialMessage]);
    setInterviewQuestion([initialMessage]);
    if (speechData) {
      speakText(initialMessage.content, continueListening);
    }
  }, [speechData]);

  useEffect(() => {
    const transcriptData = transcript;
    onTranscriptChange(transcriptData);
  }, [transcript, onTranscriptChange]);

  useEffect(() => {
    const transcribeAudio = async () => {
      if (!recordingBlob) return; // Ensure the blob data exists before proceeding

      try {
        // Step 1: Transcribe the audio using Whisper
        const formData = new FormData();
        formData.append("file", recordingBlob, "recording.webm");

        const transcriptionResponse = await openai.audio.transcriptions.create({
          file: formData.get("file"),
          model: "whisper-1",
          language: "en",
        });

        console.log("Transcription:", transcriptionResponse.text);
        setAudioTranscript(transcriptionResponse.text);
        onTranscriptChange(transcriptionResponse.text); // Notify parent of new transcript
      } catch (error) {
        console.error("Error transcribing audio:", error);
      }
    };

    transcribeAudio();
  }, [recordingBlob]); // Run effect when recordingBlob changes

  useEffect(() => {
    if (listening) {
      // Clear any existing timeouts when starting listening
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (transcript) {
        console.log("Transcript detected. Starting 3-second timer.");
        setNoResponse(true);

        // Stop listening after 5 seconds of inactivity if there's a transcript
        timeoutRef.current = setTimeout(() => {
          SpeechRecognition.stopListening();
          stopRecording();
          setAudioTranscript("");

          setShowWave(false);
        }, 3000); // 3 seconds
      } else {
        if (noResponse) {
          console.log("No transcript detected. Starting 20-second timer.");

          // Stop listening after 20 seconds if there is no transcript
          timeoutRef.current = setTimeout(() => {
            SpeechRecognition.stopListening();

            setAudioTranscript(
              "This is an automated response, I'm not available to chat."
            );
            setShowWave(false);
            setNoResponse(false);
          }, 20000); // 20 seconds
        } else {
          console.log("No transcript detected. Starting 10-second timer.");

          // Stop listening after 10 seconds if there is no transcript
          timeoutRef.current = setTimeout(() => {
            SpeechRecognition.stopListening();

            setShowWave(false);
            const userNotAvailableMessage: Message = {
              role: "assistant",
              content:
                "Thank you for participating. It appears you are not available during the exam. Your score will be updated shortly. For further assistance, please contact us.",
            };

            setAssistantAlert([userNotAvailableMessage]);
            // End exam and stop listening properly
            ExamEndMessage(userNotAvailableMessage.content, continueListening);

            resetTranscript(); // Reset the transcript immediately
            setAudioTranscript("");
            console.log(
              "Microphone stopped due to inactivity after 10 seconds."
            );
          }, 10000); // 10 seconds
        }
      }
    }

    return () => {
      // Clear the timeout if component unmounts or `listening` state changes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [listening, transcript, noResponse, stopRecording]);

  const ExamEndMessage = (text: string, continueListening: () => void) => {
    console.log("exam end msg");

    speechData
      .speak({
        text: text,
        queue: false, // Ensures that previous speech is canceled before new text is spoken
        listeners: {
          onstart: () => {
            console.log("Speech started for ending exam");
            setTranscriptAi(text);
          },
          onend: () => {
            console.log("Speech ended, now you can stop exam.");
          },
        },
      })
      .then(() => {
        console.log("Text spoken successfully for end Exam");

        handleExamEnd();
        stopRecording();
        setShowWave(false);
        resetTranscript();
        setTranscriptAi("");
        setAudioTranscript("");
      })
      .catch((e: any) => {
        console.error("An error occurred while speaking text:", e);
      });
  };

  const handleExamLeave = () => {
    // Stop all listening and recording processes
    SpeechRecognition.stopListening();

    setShowWave(false);

    // Set recording and transcript data

    resetTranscript();
    setAudioTranscript("");

    // Open the modal immediately
    setOpen(true);

    // Set a timeout to close the modal after 3 seconds and handle exam end
    setTimeout(() => {
      setOpen(false); // Close the modal
      handleExamEnd(); // Call the function to handle exam end
    }, 5000); // 5 seconds
  };

  const speakText = (text: string, continueListening: () => void) => {
    setShowWave(false);
    SpeechRecognition.stopListening();

    if (!speechData) {
      console.error("SpeechData is not initialized yet.");
      return;
    }
    speechData
      .speak({
        text: text,
        queue: false, // Ensures that previous speech is canceled before new text is spoken
        listeners: {
          onstart: () => {
            console.log("Speech started");
            setTranscriptAi(text);
          },
          onend: () => {
            console.log("Speech ended, now you can start listening again.");
          },
          onerror: (e: any) => {
            console.error("An error occurred during speech:", e);
          },
        },
      })
      .then(() => {
        console.log("Text spoken successfully");
        continueListening();
    
        if (!isRecording) {
          startRecording();
          console.log("Starting recording after text speech stop");
        }
        setShowWave(true);
      })
      .catch((e: any) => {
        console.error("An error occurred while speaking text:", e);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitAnswer = async (answer: string, questionId: any) => {
    setLoading(true);
    console.log("Handle Submit Answer Called");
    const duration = "75";
    const examId = examID;

    try {
      await submitAnswer(questionId, examId, duration, answer);
      console.log("Answer submitted successfully");
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const testIntentDetermination = async () => {
      if (!audioTranscript) return;

      const userMessage: Message = { role: "user", content: audioTranscript };
      setUserResponse([userMessage]);
      setLoading(true);

      try {
        const intent = await getChatbotResponse([
          { role: "user", content: audioTranscript },
        ]);
        console.log(`Intent for message "${audioTranscript}": ${intent}`);
        setLoading(false);

        let assistantMessage: Message | null = null;
        let assistantAlertMessage: Message | null = null;

        switch (intent) {
          case "Introduce":
            assistantAlertMessage = {
              role: "assistant",
              content:
                "Nice to meet you! We have an AI-developed question set for you. If you want to proceed with the exam, just let us know. If you prefer to exit, simply indicate that as well.",
            };
            break;

          case "Repeat":
            if (interviewQuestion.length > 0) {
              assistantMessage = {
                role: "assistant",
                content: interviewQuestion[0].content, // Repeat the current question
              };
            } else if (
              currentQuestionIndex >= 0 &&
              currentQuestionIndex < questionList.length
            ) {
              assistantMessage = {
                role: "assistant",
                content: questionList[currentQuestionIndex].title, // Repeat the current question from questionList
              };
            } else {
              assistantMessage = {
                role: "assistant",
                content: "No previous message to repeat.",
              };
            }
            break;

          case "Continue":
            if (!intro) {
              // Start the exam with the first question
              setIntro(true);
              setCurrentQuestionIndex(0);
              assistantMessage = {
                role: "assistant",
                content: questionList[0].title,
              };
              setAssistantAI([assistantMessage]);
              setInterviewQuestion([]);
              setquestionNumber(questionNumber + 1);
            } else {
              // Handle submission of current answer and move to next question
              await handleSubmitAnswer(audioTranscript, questionId);

              const nextIndex = currentQuestionIndex + 1;
              if (nextIndex < questionList.length) {
                setCurrentQuestionIndex(nextIndex);
                setquestionNumber(nextIndex + 1);
                assistantMessage = {
                  role: "assistant",
                  content: questionList[nextIndex].title,
                };
                setAssistantAI([assistantMessage]);
                setInterviewQuestion([]);
              } else {
                handleExamLeave();
                return;
              }
            }
            break;

          case "Move to a new question":
            await handleSubmitAnswer("NOT ANSWERED", questionId);

            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < questionList.length) {
              setCurrentQuestionIndex(nextIndex);
              setquestionNumber(questionNumber + 1);
              assistantMessage = {
                role: "assistant",
                content: questionList[nextIndex].title,
              };
              setAssistantAI([assistantMessage]);
            } else {
              handleExamLeave();
              return;
            }
            break;

          case "Unclear":
            assistantAlertMessage = {
              role: "assistant",
              content:
                "It seems I didn't quite catch that. Would you like to ask a different question or would you prefer to end the exam?",
            };
            break;

          case "User Not Available":
            assistantAlertMessage = {
              role: "assistant",
              content:
                "It looks like you're not available at the moment. Please tell me whether you’d like to repeat the current question, move on to the next one, or leave the exam.",
            };
            break;

          case "Explain":
            if (assistantAI.length > 0) {
              try {
                const explainByChatBot = await explainChatbotResponse([
                  {
                    role: "system",
                    content: `Could you rephrase this in a simpler way to make it easier to understand: "${assistantAI[0].content}"?`,
                  },
                ]);
                assistantMessage = {
                  role: "assistant",
                  content: explainByChatBot,
                };
              } catch (error) {
                console.error("Error explaining message:", error);
                return;
              }
            } else {
              assistantMessage = {
                role: "assistant",
                content: "No previous message to explain.",
              };
            }
            break;

          case "Leave":
            handleExamLeave();
            return;

          default:
            console.error("Unknown intent:", intent);
            return;
        }

        // Handle assistant message
        if (assistantMessage) {
          setAssistantAI([assistantMessage]); // Ensure the AI response is updated
          speakText(assistantMessage.content, continueListening);
          resetTranscript();
          setAssistantAlert([]);
          setAudioTranscript("");
        } else if (assistantAlertMessage) {
          setAssistantAlert([assistantAlertMessage]); // Ensure the AI response is updated
          speakText(assistantAlertMessage.content, continueListening);
          setAssistantAI([]);
          resetTranscript();
          setAudioTranscript("");
        }
      } catch (error) {
        console.error("Error determining intent:", error);
        setLoading(false);
      }
    };

    testIntentDetermination();
  }, [audioTranscript, currentQuestionIndex]);

  return (
    <div >
      <div className="p-2  flex flex-col rounded-md">
      <div >
      <div className="flex w-full text-sm sm:text-lg lg:text-2xl text-[#01AFF4] font-bold justify-center items-center">
          Smart Grader Ai Assistant
        </div>
        <div className="flex w-full text-slate-800 justify-center items-center text-lg py-2 font-semibold ">
          No of Question: {questionNumber}/10
        </div>
        <div className="flex gap-3 items-center ">
        {/* <div>
          <img src={selectedAvatarlogo} alt="Assitant" className=" w-16 sm:w-24 md:w-28 lg:w-40 rounded-lg" />
        </div> */}
        <div className="flex flex-col ">
          <div className="text-slate-800 text-md font-bold">{selectedAvatar}</div>
          <div className="text-sky-500 text-sm font-light font-mono">
            Ai Senior Developer
          </div>
        </div>
      </div>
      </div>
      
    
      <div className="flex flex-col  min-h-96 overflow-y-auto p-2 sm:p-4">
      <div ref={messagesEndRef}></div>
        {loading && (
          <div className="p-2 my-2 rounded-md bg-white self-end">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
        <div>
          {/* Loop through user responses */}
          {userResponse.map((message, index) => (
            <div key={`user-${index}`} className="flex w-full my-4">
              <div className=" bg-red-200 p-4 w-full text-lg rounded-xl ">
                <div className="text-slate-800 text-lg font-bold">
                  User Response
                </div>
                <div className="text-slate-800 text-lg">{message.content}</div>
              </div>
            </div>
          ))}
          {/* Loop through assistant messages */}
          {assistantAI.map((message, index) => (
            <div key={`assistant-${index}`} className="flex w-full my-4">
              <div className="relative  bg-sky-200  p-4 rounded-xl">
                <div className="text-slate-800 font-bold text-lg">
                  Question:{questionNumber}
                </div>
                <div className="text-slate-800 text-lg">{message.content}</div>
              </div>
            </div>
          ))}
          {/* Loop through Assistant Alert responses */}
          {assistantAlert.map((message, index) => (
            <div key={`user-${index}`} className="flex my-4">
              <div className=" bg-gray-200 p-4 text-lg rounded-xl">
                <div className="text-slate-800 text-lg font-bold">Assistant AI</div>
                <div className="text-slate-800 text-lg">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

     
      </div>
      </div>
      
    
   
      <div className="flex flex-col justify-center  ">
        <div className="flex w-ful flex-col xl:flex-row  justify-center p-4  items-center">
          {showWave && mediaRecorder && (
            <>
              <div className="flex xl:w-1/4  justify-center items-center">
                <div className="p-4 rounded-full bg-sky-400">
                  <IoMdMic size={30} color="white" />
                </div>
              </div>
              <div className="flex  w-4/5 mx-auto overflow-hidden">
                <LiveAudioVisualizer
                  mediaRecorder={mediaRecorder}
                  width={400}
                  height={200}
                />
              </div>
            </>
          )}
        </div>
        {!showWave && (
          <div className="flex  flex-col xl:flex-row justify-center  items-center ">
            <div className="flex w-full  lg:w-1/4 justify-center items-center">
              <div className="p-4 bg-red-500 rounded-full">
                <HiSpeakerWave size={30} color="white" />
              </div>
            </div>
            <div className="flex w-full lg:w-3/4 justify-center items-center">
              <WaveEffect transcript={transcriptAi} />
            </div>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        styles={{
          modal: {
            maxWidth: "600px",
            width: "90%",
            borderRadius: "5px",
          },
        }}
      >
        <div className="mt-5 flex flex-col  w-full justify-center items-center">
          <div className="text-xl my-4 font-bold text-gray-700 uppercase">
            THANK YOU FOR PARTICIPATING
          </div>

          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[5, 3, 2, 0]}
          >
            {({ remainingTime }) => (
              <div
                role="timer"
                className=" flex flex-col gap-3 justify-center items-center"
              >
                <div className="text-red-500 font-bold text-4xl">
                  {remainingTime}
                </div>{" "}
                <div className="text-sky-400 text-md">seconds</div>
              </div>
            )}
          </CountdownCircleTimer>
          <div className="flex text-lg font-middle justify-center items-center my-8  text-gray-800">
            Your progress will be saved, and you will be notified of the results
            shortly. If you have any questions or need further assistance, feel
            free to reach out.
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AIChat;