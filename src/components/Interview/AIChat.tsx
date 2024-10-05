import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useReactMediaRecorder } from "react-media-recorder";
import { useUserId } from "../../context/userId";
import { toast } from "react-toastify";
import {
  getChatbotResponse,
  explainChatbotResponse,
} from "../../services/api/OpenaiService.js";
import Assistant from "../../assets/assitant.png";
import { submitAnswer } from "../../services/api/InterviewService";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
//@ts-ignore
import WaveEffect from "../Interview/WaveEffect.jsx";
import Speech from "speak-tts";

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
}

type ChatMessageRole = "system" | "user" | "assistant";

interface ChatMessage {
  role: ChatMessageRole;
  content: string;
}

const AIChat: React.FC<AIChatProps> = ({
  questionList,
  handleExamEnd,
  examID,
  onTranscriptChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [transcriptMsg, setTranscriptMsg] = useState("");
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [listeningEnabled, setListeningEnabled] = useState(true);
  const [showWave, setShowWave] = useState(false);
  const [lastAssistantMessage, setLastAssistantMessage] =
    useState<ChatMessage | null>(null); // Add state for last assistant message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { selectedUserId } = useUserId();
  const userId = selectedUserId;
  const [noResponse, setNoResponse] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [speechData, setSpeechData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const continueListening = () => {
    if (listeningEnabled) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    }
  };

  const questionId = questionList[currentQuestionIndex]?.id;

  //  // Initialize Speech
  const speech = new Speech();

  useEffect(() => {
    // Initialize Speech with configuration
    speech
      .init({
        volume: 1,
        lang: "en-In",
        rate: 1,
        pitch: 1,
        //voice: 'Google UK English Male',
        splitSentences: true,
      })
      .then((data) => {
        console.log("Speech is ready, voices available:", data.voices);
        setSpeechData(speech);
      })
      .catch((e) => {
        console.error("An error occurred while initializing:", e);
      });
  }, []);

  useEffect(() => {
    const initialMessage: ChatMessage = {
      role: "assistant",
      content:
        "Welcome to SmartGrader. Introduce yourself, and then provide an overview of your professional journey and expertise.",
    };

    setMessages([initialMessage]);
    setLastAssistantMessage(initialMessage); // Update the last assistant message
    if (speechData) {
      speakText(initialMessage.content, continueListening, startRecording);
    }
  }, [speechData]);

  useEffect(() => {
    const transcriptData = transcript;
    onTranscriptChange(transcriptData);
  }, [transcript, onTranscriptChange]);

  useEffect(() => {
    if (listening) {
      // Clear any existing timeouts when starting listening
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (transcript) {
        console.log("Transcript detected. Starting 5-second timer.");
        setNoResponse(true);

        // Stop listening after 5 seconds of inactivity if there's a transcript
        timeoutRef.current = setTimeout(() => {
          SpeechRecognition.stopListening();
          stopRecording();
          setRecordingUrl(mediaBlobUrl || null);
          setAudioBlob(audioBlob || null);
          setTranscriptMsg(transcript);
          console.log("Microphone stopped due to inactivity after 5 seconds.");
          setShowWave(false);
        }, 5000); // 5 seconds
      } else {
        if (noResponse) {
          console.log("No transcript detected. Starting 20-second timer.");

          // Stop listening after 20 seconds if there is no transcript
          timeoutRef.current = setTimeout(() => {
            SpeechRecognition.stopListening();
            stopRecording();
            setRecordingUrl(mediaBlobUrl || null);
            setAudioBlob(audioBlob || null);
            setTranscriptMsg(
              "This is an automated response; I'm not available to chat."
            );
            setShowWave(false);
            setNoResponse(false);
          }, 20000); // 20 seconds
        } else {
          console.log("No transcript detected. Starting 10-second timer.");

          // Stop listening after 10 seconds if there is no transcript
          timeoutRef.current = setTimeout(() => {
            SpeechRecognition.stopListening();
            stopRecording();
            setShowWave(false);
            const userNotAvailableMessage: ChatMessage = {
              role: "assistant",
              content:
                "Thank you for participating. It appears you are not available during the exam. Your score will be updated shortly. For further assistance, please contact us.",
            };

            // Add the userNotAvailableMessage to the chat
            setMessages((prevMessages) => [
              ...prevMessages,
              userNotAvailableMessage,
            ]);

            // End exam and stop listening properly
            ExamEndMessage(userNotAvailableMessage.content, continueListening);
            setRecordingUrl(mediaBlobUrl || null);
            setAudioBlob(audioBlob || null);
            resetTranscript(); // Reset the transcript immediately
            setTranscriptMsg("");
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
  }, [listening, transcript, noResponse]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ExamEndMessage = (text: string, continueListening: () => void) => {
    console.log("exam end msg");
    speechData
      .speak({
        text: text,
        queue: false, // Ensures that previous speech is canceled before new text is spoken
        listeners: {
          onstart: () => {
            console.log("Speech started for ending exam");
          },
          onend: () => {
            console.log("Speech ended, now you can stop exam.");
          },
        },
      })
      .then(() => {
        console.log("Text spoken successfully for end Exam");

        handleExamEnd();

        setShowWave(false);
        resetTranscript();
        setTranscriptMsg("");
      })
      .catch((e: any) => {
        console.error("An error occurred while speaking text:", e);
      });
  };

  const handleExamLeave = () => {
    // Stop all listening and recording processes
    SpeechRecognition.stopListening();
    stopRecording();
    setShowWave(false);

    // Set recording and transcript data
    setRecordingUrl(mediaBlobUrl || null);
    setAudioBlob(audioBlob || null);
    resetTranscript();
    setTranscriptMsg("");

    // Open the modal immediately
    setOpen(true);

    // Set a timeout to close the modal after 3 seconds and handle exam end
    setTimeout(() => {
      setOpen(false); // Close the modal
      handleExamEnd(); // Call the function to handle exam end
    }, 5000); // 5 seconds
  };

  const speakText = (
    text: string,
    continueListening: () => void,
    startRecording: () => void
  ) => {
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
        // startRecording();
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
  //console.log("loading value",loading)
  useEffect(() => {
    const testIntentDetermination = async () => {
      if (!transcriptMsg) return;

      const userMessage: ChatMessage = { role: "user", content: transcriptMsg };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);
      try {
        const intent = await getChatbotResponse([
          { role: "user", content: transcriptMsg },
        ]);
        console.log(`Intent for message "${transcriptMsg}": ${intent}`);
        setLoading(false);
        let assistantMessage: ChatMessage | null = null;

        switch (intent) {
          case "Introduce":
            assistantMessage = {
              role: "assistant",
              content:
                "Nice to meet you! We have an AI-developed question set for you. If you want to proceed with the exam, just let us know. If you prefer to exit, simply indicate that as well.",
            };

            setLastAssistantMessage(assistantMessage);
            break;

          case "Repeat":
            assistantMessage = lastAssistantMessage || {
              role: "assistant",
              content: "No previous message to repeat.",
            };
            break;

          case "Continue":
            if (!intro) {
              // Set intro to true and immediately start with the first question
              setIntro(true);
              setCurrentQuestionIndex(0); // Start with the first question (index 0)
              assistantMessage = {
                role: "assistant",
                content: questionList[0].title, // Display the first question directly
              };
              setLastAssistantMessage(assistantMessage);
            } else {
              // If intro is already true, continue with the current question or submit answer
              try {
                await handleSubmitAnswer(transcriptMsg, questionId);

                const nextIndex = currentQuestionIndex + 1;
                if (nextIndex < questionList.length) {
                  setCurrentQuestionIndex(nextIndex);
                  assistantMessage = {
                    role: "assistant",
                    content: questionList[nextIndex].title,
                  };
                  setLastAssistantMessage(assistantMessage);
                } else {
                  handleExamLeave();
                 // handleExamEnd();
                  return;
                }
              } catch (error) {
                console.error("Error submitting answer:", error);
                return;
              }
            }
            break;

          case "Move to a new question":
            try {
              await handleSubmitAnswer("NOT ANSWERED", questionId);

              const nextIndex = currentQuestionIndex + 1;
              if (nextIndex < questionList.length) {
                setCurrentQuestionIndex(nextIndex);
                assistantMessage = {
                  role: "assistant",
                  content: questionList[nextIndex].title,
                };
                setLastAssistantMessage(assistantMessage);
              } else {
                handleExamLeave();
                //handleExamEnd();
                return;
              }
            } catch (error) {
              console.error("Error submitting answer:", error);
              return;
            }
            break;

          case "Unclear":
            assistantMessage = {
              role: "assistant",
              content:
                "I'm sorry, I didn't quite understand that. Would you like to repeat the current question, ask a different question, or leave the exam?",
            };
            break;

          case "User Not Available":
            assistantMessage = {
              role: "assistant",
              content:
                "It looks like you're not available at the moment. This is your final prompt. Please tell me whether you’d like to repeat the current question, move on to the next one, or want to leave the exam.",
            };
            break;

          case "Explain":
            if (lastAssistantMessage) {
              try {
                const explainByChatBot: any = await explainChatbotResponse([
                  {
                    role: "system",
                    content: `Can you ask this in another way: ${lastAssistantMessage.content}`,
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
            // assistantMessage = {
            //   role: "assistant",
            //   content: "Thank you for your answers. We will update your score shortly.",
            // };
            handleExamLeave();
            //  speakText(assistantMessage.content, continueListening,startRecording);
            // handleExamEnd();
            // return;
            break;
          default:
            console.error("Unknown intent:", intent);
            return;
        }

        if (assistantMessage) {
          setMessages((prevMessages) => [...prevMessages, assistantMessage]);
          speakText(
            assistantMessage.content,
            continueListening,
            startRecording
          );
          resetTranscript();
          setTranscriptMsg("");
        }
      } catch (error) {
        console.error("Error determining intent:", error);
      }
    };

    testIntentDetermination();
  }, [transcriptMsg, currentQuestionIndex]);

  return (
    <div className="flex flex-col h-auto min-h-[500px] lg:min-h-[750px] max-h-[700px] ">
      <div className="bg-[#01AFF4] text-white p-4 flex justify-between items-center rounded-md">
        <div className="flex items-center">
          <div className="ml-2 font-bold">SmartGrader AI Assistant</div>
        </div>
      </div>
      <div className="flex-1  overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === "user" ? (
              <div className="flex justify-end">
                <div className="relative text-white bg-sky-400 p-4 rounded-md shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.2)] ml-12 rounded-tr-none">
                  {message.content}
                </div>
                <div className="w-0 h-0 border-t-[0px] border-t-transparent border-l-[20px] border-l-sky-400 border-b-[20px] border-b-transparent"></div>
              </div>
            ) : (
              <div className="flex my-4 ">
                <div className="w-0 h-0 border-t-[0px] border-t-transparent border-r-[20px] border-r-slate-200 border-b-[20px] border-b-transparent"></div>
                <div className="text-slate-800 bg-slate-200 p-4 rounded-tl-none rounded-md mr-12 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.2)]">
                  {message.content}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
        {loading && (
          <div className="p-2 my-2 rounded-md bg-white self-start">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
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
            {({ remainingTime }) =>  <div role="timer" className=" flex flex-col gap-3 justify-center items-center">
   <div className="text-red-500 font-bold text-4xl">{remainingTime}</div> <div className="text-sky-400 text-md">seconds</div>
  </div>}
          </CountdownCircleTimer>
          <div className="flex text-lg font-middle justify-center items-center my-8  text-gray-800">
            Your progress will be saved, and you will be
            notified of the results shortly. If you have any questions or need
            further assistance, feel free to reach out.
          </div>
        </div>
      </Modal>
      {<WaveEffect showWave={showWave} />}
      {/* <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
      <div>{recordingUrl}</div>
    </div> */}
    </div>
  );
};

export default AIChat;
