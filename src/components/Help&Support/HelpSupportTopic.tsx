import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import helpSupportTopics from "./helpSupportContent.json"; // Adjust path as necessary
import NotificationBar from "../common/Notification/NotificationBar";
import { handleHelpAndSupport } from "../../services/api/OpenaiService"; // Adjust path to your chatbot file
import ReactMarkdown from "react-markdown"; // For rendering Markdown content

type ChatMessageRole = "system" | "user" | "assistant";

interface ChatMessage {
  role: ChatMessageRole;
  content: string;
}

const HelpSupportTopic: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const topic = helpSupportTopics.topics.find((topic) => topic.id === id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChatSubmit = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage: ChatMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput(""); // Clear the input field

    try {
      const newMessages: ChatMessage[] = [
        {
          role: "system",
          content: `You are a highly skilled assistant. Respond specifically about "${topic?.name}" and focus on providing helpful information related to this topic.`,
        },
        userMessage,
      ];

      const response = await handleHelpAndSupport(newMessages);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!topic) {
    return <div className="p-6">Topic not found</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen mx-auto bg-gradient-to-b from-sky-50 via-sky-50 to-sky-200">
      <NotificationBar />
      <div className="flex flex-col lg:flex-row m-4">
        {/* Chat History */}
        <div className="w-full lg:w-2/3 flex  flex-col order-2 lg:order-1">
          <div className="flex max-sm:flex-col p-4  flex-row">
            <div className=" md:w-1/5 mx-auto">
              <img
                src={`/${topic.image_url}`}
                alt="Topic"
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>
            <div className="w-full md:w-4/5">
              <h1 className="text-2xl font-bold mb-4">{topic.name}</h1>
              <p className="text-lg mb-4">{topic.description}</p>
              <p className="text-md mb-4">{topic.details}</p>
            </div>
          </div>

          <div className="m-4 p-4 border rounded-md bg-sky-100">
            <div>
              <div className="font-medium text-lg text-gray-600">
                Related Questions
              </div>
              <div className="flex max-sm:flex-col lg:flex-col xl:flex-row justify-start items-start md:m-4 gap-4">
                {topic.questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex bg-blue-200 p-4 rounded-md cursor-pointer"
                    onClick={() => setUserInput(question)}
                  >
                    {/* <span className="mr-2 text-blue-500 font-semibold">
                      Q{index + 1}:
                    </span> */}
                    <span>{question}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4 sm:p-4 max-h-[400px]">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="relative text-white bg-sky-400 p-4 rounded-md shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.2)] ml-4 sm:ml-12 rounded-tr-none">
                        {message.content}
                      </div>
                      <div className="w-0 h-0 border-t-[0px] border-t-transparent border-l-[20px] border-l-sky-400 border-b-[20px] border-b-transparent"></div>
                    </div>
                  ) : (
                    <div className="flex my-4">
                      <div className="w-0 h-0 border-t-[0px] border-t-transparent border-r-[20px] border-r-slate-200 border-b-[20px] border-b-transparent"></div>
                      <div className="text-slate-800 bg-slate-200 p-4 rounded-tl-none rounded-md mr-4 sm:mr-12 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.2)]">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
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

            <div className="flex gap-4 items-center mt-4">
              <input
                type="text"
                className="w-full px-3 py-2 border bg-yellow-50 rounded-md focus:outline-none focus:border-sky-300 focus:ring-0"
                placeholder="Ask a question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              />

              <button
                onClick={handleChatSubmit}
                className=" px-4 py-2 self-end bg-sky-500 hover:bg-sky-700 text-white rounded"
                disabled={loading}
              >
                {loading ? "Loading..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full max-sm:hidden lg:w-1/2 p-4 rounded-xl order-1 lg:order-2">
          <div className="w-full xl:w-5/6 mx-auto">
            <img
              src={topic.background_img_url}
              alt="Background"
              className="mx-auto h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportTopic;
