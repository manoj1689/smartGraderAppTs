import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useUserId } from "../../context/userId"; // Adjust the path if needed
import { toast } from "react-toastify";
import { getChatbotResponse } from "../../services/api/openaiService"; // Adjust the path if needed
import Assistant from "../../assets/assitant.png";
import { submitAnswer } from "../../services/api/InterviewService";
//@ts-ignore
import WaveEffect from "../Interview/WaveEffect.jsx"
// Define the type for the question set
interface Question {
  id: number;
  title: string;
  description: string;
  type: number;
  duration: number;
}

// Define the props type for AIChat
interface AIChatProps {
  questionList: Question[];
  handleExamEnd: () => void;
  examID:string;
  onTranscriptChange: (transcript: string) => void; 
}

// Define types for ChatMessage
type ChatMessageRole = "system" | "user" | "assistant";

interface ChatMessage {
  role: ChatMessageRole;
  content: string;
}

const AIChat: React.FC<AIChatProps> = ({ questionList ,handleExamEnd ,examID,onTranscriptChange}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [intro,setIntro]=useState(true)
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [listeningEnabled, setListeningEnabled] = useState(true);
    const [showWave, setShowWave] = useState(false);
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

//console.log(`the Question set id at ${currentQuestionIndex} is ${questionList[currentQuestionIndex].id}`  )
 
 const questionId=questionList[currentQuestionIndex].id;

  useEffect(() => {
    // Start with the first message when the component mounts
    const initialMessages: ChatMessage[] = [
      {
        role: "assistant",
        content: "Hi, start by giving a brief introduction about yourself.",
      },
    ];
   setMessages(initialMessages);
    speakText(initialMessages[0].content, continueListening);
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    // Simulate obtaining transcript data
    const transcriptData = transcript;

    // Send data to parent component
    onTranscriptChange(transcriptData);
  }, [onTranscriptChange]);


  useEffect(() => {
    if (listening) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        sendMessage();
        console.log("Microphone stopped due to inactivity");
        setShowWave(false)
      }, 7000); // 7 seconds
    }
  }, [listening, transcript]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string, continueListening: () => void) => {
    setShowWave(false)
    const synth = window.speechSynthesis;

    // Fetch voices
    const voices = synth.getVoices();
    // Filter for female voices
    const femaleVoices = voices.filter((voice) =>
      voice.name.toLowerCase().includes("female")
    );

    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Check if a female voice is available, otherwise use the default voice
      utterance.voice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];

      // Handle the end of speech synthesis
      utterance.onend = () => {
        console.log("Speech ended, now you can start listening again.");
        continueListening();
        setShowWave(true)

      };

      synth.speak(utterance);
    }
  };

  // console.log("Show Wave",showWave)
  const AlertMessage = (text: string, continueListening: () => void) => {
    const synth = window.speechSynthesis;
    setShowWave(false)
    SpeechRecognition.stopListening();
    // Fetch voices
    const voices = synth.getVoices();
    // Filter for female voices
    const femaleVoices = voices.filter((voice) =>
      voice.name.toLowerCase().includes("female")
    );

    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Check if a female voice is available, otherwise use the default voice
      utterance.voice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];

      // Handle the end of speech synthesis
      utterance.onend = () => {
        console.log("Alert Message, wait for alert message to speak.");
        continueListening();
        setShowWave(true)
        resetTranscript(); // Reset the transcript after the message is spoken
      };

      synth.speak(utterance);
    }
  };

  const examEndMessage = (text: string) => {
    const synth = window.speechSynthesis;
    SpeechRecognition.stopListening();
    // Fetch voices
    const voices = synth.getVoices();
    // Filter for female voices
    const femaleVoices = voices.filter((voice) =>
      voice.name.toLowerCase().includes("female")
    );

    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Check if a female voice is available, otherwise use the default voice
      utterance.voice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];

      // Handle the end of speech synthesis
      utterance.onend = () => {
        console.log("Exam End  Message, wait for alert message to speak.");
        setInputValue("");
        resetTranscript();
        SpeechRecognition.stopListening();
        setListeningEnabled(false); // Reset the transcript after the message is spoken
        handleExamEnd();
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
    const duration = "12";
    const examId = examID;

    if (intro) {
      console.log("Question ID is 1, answer data:", {
        questionId,
        examId,
        duration,
        answer,
      });
      setIntro(false)
    } else {
      try {
        if(!intro){
          await submitAnswer(questionId, examId, duration, answer);
          console.log("Answer submitted successfully");
        }
       
      } catch (error) {
        console.error("Error submitting answer:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const sendMessage = async () => {
    
    if (!inputValue && !transcript) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "Sorry, no response recorded. Do you want to continue or exit the exam?",
        },
      ]);
      AlertMessage(
        "Sorry, no response recorded. Do you want to continue or exit the exam?",
        continueListening
      );
      return; 
    }
  
    const messageToSend = inputValue || transcript;
  
    if (messageToSend.toLowerCase() === "continue") {
      
      const newMessage: ChatMessage = { content: messageToSend, role: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLoading(true);
      try {
        await handleSubmitAnswer("Not Answered" ,questionId);
      } catch (error) {
        console.error("Error submitting 'NOT ANSWERED':", error);
      }
      SpeechRecognition.stopListening();
      setInputValue(transcript);
      resetTranscript();
  
      if (!answered) {
        setAnswered(true);
        setCurrentQuestionIndex(0); 
  
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: questionList[0].title,
          },
        ]);
        speakText(questionList[0].title, continueListening);
      } else {
        setTimeout(() => {
          handleNextQuestion();
        }, 1000); 
      }
  
      setInputValue("");
      resetTranscript();
      return; 
    }
  
    if (messageToSend.toLowerCase() === "exit") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "Thank you for answering the questions. Your responses have been recorded.",
        },
      ]);
      examEndMessage(
        "Thank you for answering the questions. Your responses have been recorded."
      );
      return; 
    }
  
    const newMessage: ChatMessage = { content: messageToSend, role: "user" };
    console.log("Answer of Question ", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
  
    SpeechRecognition.stopListening();
    setInputValue(transcript);
    resetTranscript();
  
    try {
      await handleSubmitAnswer(newMessage.content ,questionId);
  
      if (!answered) {
        setAnswered(true);
        setCurrentQuestionIndex(0); 
  
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: questionList[0].title,
          },
        ]);
        speakText(questionList[0].title, continueListening);
      } else {
        const response = await getChatbotResponse([...messages, newMessage]);
  
        const botMessage: ChatMessage = {
          content: response || "",
          role: "assistant",
        };
        setLoading(false);
  
        setMessages((prevMessages) => [...prevMessages, botMessage]);
  
        setTimeout(() => {
          handleNextQuestion();
        }, 1000); 
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI API:", error);
      setLoading(false);
    }
  
    setInputValue("");
    resetTranscript();
    SpeechRecognition.stopListening();
  };
  




const handleNextQuestion = async () => {
  const nextIndex = currentQuestionIndex + 1;
  
  if (nextIndex < questionList.length) {
    setCurrentQuestionIndex(nextIndex);
    const nextQuestion = questionList[nextIndex].title;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: nextQuestion,
      },
    ]);
    speakText(nextQuestion, continueListening);
  } else {
    // End of manual questions
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content:
          "Thank you for answering the questions. Your responses have been recorded.",
      },
    ]);
    examEndMessage("Thank you for answering all the questions. Your responses have been recorded.");
  }
};

  const storeMessage = async () => {
    if (!userId) return;

    console.log("The List of all communication", messages);
    const sendMsg = async (userId: number) => {
      try {
        const response = await fetch("/api/storeChat", {
          // Replace with your actual API URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            description: "Chat summary",
            chatHistory: messages,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to store message");
        }

        toast.success("Chat saved successfully");
        return response.json();
      } catch (error) {
        console.error("Error storing messages:", error);
        toast.error("Error storing messages");
      }
    };

    if (userId !== -1) await sendMsg(userId);
  };

  return (
<div className="flex flex-col h-auto min-h-[500px] lg:min-h-[750px] max-h-[700px] ">
  <div className="bg-blue-500 text-white p-4 flex justify-between items-center rounded-md">
    <div className="flex items-center">
      <img
        src={Assistant}
        alt="User Profile"
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-2 font-bold">SmartGrader AI Assistant</div>
    </div>
  </div>
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map((message, index) => (
      <div
        className={`p-2 my-2 rounded-md ${
          message.role === "user"
            ? "bg-pink-200 self-end ml-12"
            : "bg-blue-200 self-start mr-12 "
        }`}
        key={index}
      >
        {message.content}
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
 
  {<WaveEffect showWave={showWave}/>}
</div>

  );
};

export default AIChat;
