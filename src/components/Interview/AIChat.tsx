import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useUserId } from "../../context/userId";
import { toast } from "react-toastify";
import { getChatbotResponse } from "../../services/api/openaiService";
import Assistant from "../../assets/assitant.png";
import { submitAnswer } from "../../services/api/InterviewService";
//@ts-ignore
import WaveEffect from "../Interview/WaveEffect.jsx";

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
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [listeningEnabled, setListeningEnabled] = useState(true);
  const [showWave, setShowWave] = useState(false);
  const [lastAssistantMessage, setLastAssistantMessage] = useState<ChatMessage | null>(null); // Add state for last assistant message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { selectedUserId } = useUserId();
  const userId = selectedUserId;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const continueListening = () => {
    if (listeningEnabled) {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const questionId = questionList[currentQuestionIndex]?.id;

  useEffect(() => {
    const initialMessage: ChatMessage = {
      role: "assistant",
      content: "Hi, start by giving a brief introduction about yourself.",
    };
    setMessages([initialMessage]);
    setLastAssistantMessage(initialMessage); // Update the last assistant message
    speakText(initialMessage.content, continueListening);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    const transcriptData = transcript;
    onTranscriptChange(transcriptData);
  }, [transcript, onTranscriptChange]);

  useEffect(() => {
    if (listening) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if(transcript !==""){
        timeoutRef.current = setTimeout(() => {
          SpeechRecognition.stopListening();
          setTranscriptMsg(transcript);
          console.log("Microphone stopped due to inactivity");
          setShowWave(false);
          
        }, 10000); // 10 seconds
      }if (transcript===""){
        timeoutRef.current = setTimeout(() => {
          SpeechRecognition.stopListening();
          console.log("Microphone stopped due to inactivity");
          setShowWave(false);
          const clarificationMessage: ChatMessage = {
            role: "assistant",
            content:
              "Sorry, I didn't get a response. Thanks for participating the exam ",
          };
          setMessages((prevMessages) => [...prevMessages, clarificationMessage]);
          setLastAssistantMessage(clarificationMessage);
          ExamEndMessage(clarificationMessage.content, continueListening);

          
        }, 30000); // 10 seconds
      }
 
    }
  }, [listening, transcript]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string, continueListening: () => void) => {
    setShowWave(false);
    const synth = window.speechSynthesis;

    const voices = synth.getVoices();
    const femaleVoices = voices.filter((voice) =>
      voice.name.toLowerCase().includes("female")
    );

    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];

      utterance.onend = () => {
        console.log("Speech ended, now you can start listening again.");
        continueListening();
        setShowWave(true);
      };

      synth.speak(utterance);
    }
  };
  const ExamEndMessage = (text: string, continueListening: () => void) => {
    setShowWave(false);
    const synth = window.speechSynthesis;

    const voices = synth.getVoices();
    const femaleVoices = voices.filter((voice) =>
      voice.name.toLowerCase().includes("female")
    );

    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];

      utterance.onend = () => {
        console.log("Speech ended, now you can start listening again.");
        SpeechRecognition.stopListening();
        setShowWave(false);
        resetTranscript();
        setTranscriptMsg("")
        handleExamEnd()
      };

      synth.speak(utterance);
    }
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
       if (!transcriptMsg) return;

      const userMessage: ChatMessage = { role: "user", content: transcriptMsg };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      try {
        const intent = await getChatbotResponse([{ role: "user", content: transcriptMsg }]);
        console.log(`Intent for message "${transcriptMsg}": ${intent}`);

        let assistantMessage: ChatMessage | null = null;

        if (intent === "Introduce" || intent === "Repeat") {
          if (intent === "Repeat" && lastAssistantMessage) {
            assistantMessage = lastAssistantMessage;
          } else {
            assistantMessage = {
              role: "assistant",
              content: questionList[0].title,
            };
          }
          
          resetTranscript();
          setTranscriptMsg("");
          setLastAssistantMessage(assistantMessage); // Update last assistant message
          speakText(assistantMessage.content, continueListening);
        } else if (intent === "Continue") {
          try {
            await handleSubmitAnswer(transcript, questionId);
            resetTranscript();
            setTranscriptMsg("");
        
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < questionList.length) {
              setCurrentQuestionIndex(nextIndex);
              const assistantMessage: ChatMessage = {
                role: "assistant",
                content: questionList[nextIndex].title,
              };
              setMessages((prevMessages) => [...prevMessages, assistantMessage]);
              setLastAssistantMessage(assistantMessage); // Update last assistant message
              speakText(assistantMessage.content, continueListening);
            } else {
              handleExamEnd();
            }
          } catch (error) {
            console.error("Error submitting answer:", error);
          }
        } else if (intent === "Move to a new question") {
          try {
            await handleSubmitAnswer("NOT Answered", questionId);
            resetTranscript();
            setTranscriptMsg("");
        
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < questionList.length) {
              setCurrentQuestionIndex(nextIndex);
              const assistantMessage: ChatMessage = {
                role: "assistant",
                content: questionList[nextIndex].title,
              };
              setMessages((prevMessages) => [...prevMessages, assistantMessage]);
              setLastAssistantMessage(assistantMessage); // Update last assistant message
              speakText(assistantMessage.content, continueListening);
            } else {
              handleExamEnd();
            }
          } catch (error) {
            console.error('Error submitting answer:', error);
          }
        } else if (intent === "Unclear" ) {
          const unclearMessage: ChatMessage = {
            role: 'assistant',
            content: "I'm sorry, I didn't quite understand that. Could you please clarify or ask another question?",
          };
          setMessages((prevMessages) => [...prevMessages, unclearMessage]);
          setLastAssistantMessage(unclearMessage); // Update last assistant message
          speakText(unclearMessage.content, continueListening);
          resetTranscript();
          setTranscriptMsg("");

        } else if (intent === "Leave"){
          resetTranscript();
          setTranscriptMsg("");

          assistantMessage = {
            role: "assistant",
            content: "Thank you for your Answers, we will update your score shortly.",
          };
         // setLastAssistantMessage(assistantMessage); // Update last assistant message
          ExamEndMessage(assistantMessage.content, continueListening);
        }

        if (assistantMessage) {
          setMessages((prevMessages) => [...prevMessages, assistantMessage]);
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
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === "user" ? (
              <div className="flex justify-end">
                <div className="relative text-white bg-sky-400 p-4 rounded-md shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.2)] ml-12 rounded-tr-none">
                  {message.content}
                </div>
                <div
                  className="w-0 h-0 border-t-[0px] border-t-transparent border-l-[20px] border-l-sky-400 border-b-[20px] border-b-transparent"
                ></div>
              </div>
            ) : (
              <div className="flex my-4">
                <div
                  className="w-0 h-0 border-t-[0px] border-t-transparent border-r-[20px] border-r-slate-200 border-b-[20px] border-b-transparent"
                ></div>
                <div className="text-slate-800 bg-slate-200 p-4 rounded-tl-none rounded-md mr-12 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.2)]">
                  {message.content}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
        {loading && (
          <div className="p-2 my-2 rounded-md bg-blue-200 self-start">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {<WaveEffect showWave={showWave} />}
    </div>
  );
};

export default AIChat;
