import React,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import SmartGrader from "../assets/logos/smartGrader.png";
import { getToken } from "../utils/tokenUtils";
import { LineScore } from "../types/interfaces/interface";
import { fetchexamAttemps } from "../services/api/LineScoreService";
import {
  FaBook,
  FaClipboard,
  FaPuzzlePiece,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

const ExamEndPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const examId = location.state || null;
  
  console.log("Exam id of conduct exam on exam end page",examId)
  const [results, setResults] = useState<LineScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [result,setResult]=useState<any>([])
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          console.error("Token not found.");
          return;
        }
        const data = await fetchexamAttemps(token);
        setResults(data);
  
        // Find the specific exam by its examId
        const matchingExam = data.find((attempt) => attempt.exam_id === examId.examId);
        if (matchingExam) {
          setResult(matchingExam); // Store the matching exam data
        } else {
          console.log("No matching exam found for examId:", examId.examId);
        }
  
        setLoading(false); // Set loading state to false after data fetch
      } catch (error) {
        console.error("Error fetching attempts:", error);
        setLoading(false); // Set loading state to false on error
      }
    };
  
    fetchData();
  }, [examId]);
  
  
  console.log("the result List have set id for each attemptat examEnd page", results);
  



  const highlights = [
    {
      icon: <FaBook aria-label="Book icon" className="text-indigo-600" />,
      title: "Knowledge Level",
      color: "bg-indigo-100",
      description:
        "Assessing your understanding of the subject matter based on your responses.",
    },
    {
      icon: (
        <FaClipboard aria-label="Clipboard icon" className="text-green-600" />
      ),
      title: "Factual Accuracy",
      color: "bg-green-100",
      description:
        "Evaluating the correctness of the information provided in your answers.",
    },
    {
      icon: (
        <FaPuzzlePiece aria-label="Puzzle icon" className="text-yellow-600" />
      ),
      title: "Completeness",
      color: "bg-yellow-100",
      description:
        "Determining if all parts of the question were addressed in your response.",
    },
    {
      icon: (
        <FaLightbulb aria-label="Lightbulb icon" className="text-blue-600" />
      ),
      title: "Relevance",
      color: "bg-blue-100",
      description:
        "Measuring how well your answer aligns with the question asked.",
    },
    {
      icon: <FaPuzzlePiece aria-label="Puzzle icon" className="text-red-600" />,
      title: "Coherence",
      color: "bg-red-100",
      description: "Assessing the logical flow and structure of your response.",
    },
    {
      icon: <FaStar aria-label="Star icon" className="text-purple-600" />,
      title: "Score",
      color: "bg-purple-100",
      description:
        "The overall score reflecting your performance across all evaluation criteria.",
    },
  ];

  const overallScore = 75; // This should be dynamically calculated
  const performanceLevel =
    overallScore >= 80
      ? "Excellent"
      : overallScore >= 60
      ? "Good"
      : overallScore >= 40
      ? "Better"
      : "Poor";

  return (
    <>
      <div className="flex items-center justify-between border-b bg-white fixed w-full top-0 border-slate-200">
        <div className="w-auto p-4">
          <img src={SmartGrader} alt="Smart Grader" className="max-sm:w-28 sm:w-40" />
        </div>
      </div>
      <div className="container mx-auto w-full lg:mt-24 ">
        <NotificationBar />
        <div className="bg-white rounded-md border mx-4 border-gray-300 p-4 shadow-lg transition-shadow hover:shadow-xl">
          <div className="text-center ">
            <h2 className="text-4xl font-extrabold text-slate-700 my-8">
            Thank You for Completing the Exam!
            </h2>
            <p className="text-lg text-slate-500 mb-2">
            Your performance has been assessed based on multiple criteria.
            </p>
            {/* <p className="text-md text-gray-600 mb-6">
              We will highlight the following areas in your scorecard:
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col p-4 ${item.color} rounded-lg shadow-lg hover:shadow-2xl transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-md text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>


        </div>
        <div className="flex flex-col md:flex-row justify-center mx-4 my-8 gap-8">
          <button
            type="button"
            className="px-8 py-4 w-full bg-gray-300  text-gray-600 rounded transition-all duration-300 transform hover:bg-gray-400 hover:scale-105"
            onClick={() => navigate(`/dashboard`)}
          >
            Go to Dashboard
          </button>
          <button
            type="button"
            className="px-8 py-4 w-full bg-blue-500 text-white rounded transition-all duration-300 transform hover:bg-sky-700 hover:scale-105"
            onClick={() => navigate("/dashboard/result", { state: { result } })}
          >
            Check Score
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamEndPage;
