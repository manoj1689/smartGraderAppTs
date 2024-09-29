import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import SmartGrader from "../assets/logos/smartGrader.png";
import {
  FaBook,
  FaClipboard,
  FaPuzzlePiece,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

const ExamEndPage = () => {
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between border-b bg-sky-100 fixed w-full top-0 border-slate-200">
        <div className="w-auto p-4">
          <img src={SmartGrader} alt="Smart Grader" width={140} />
        </div>
      </div>
      <div className="container mx-auto w-full mt-24 ">
        <NotificationBar />
        <div className="bg-sky-100 rounded-md border border-solid  p-4 shadow-lg transition-shadow hover:shadow-xl">
          <div className="text-center ">
            <h2 className="text-4xl font-extrabold text-slate-700 mb-2">
              Exam End
            </h2>
            <p className="text-lg text-slate-500 mb-2">
              Result Based on AI Analysis
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

          <div className="flex flex-col sm:flex-row items-center justify-between ">
  <div className="flex-1 text-center p-4 sm:text-left sm:mr-8 w-full sm:w-1/2 mb-4 sm:mb-0">
    <h3 className="text-2xl font-semibold text-slate-800 mb-2">Performance Level</h3>
    <p className="text-lg text-gray-700 mb-2">{performanceLevel}</p>
    <p className="text-md text-gray-600 mb-4">
      Your performance is categorized based on the following thresholds:
    </p>
    <ul className="list-disc list-inside text-gray-600">
      <li>80% and above: Excellent</li>
      <li>60% to 79%: Good</li>
      <li>40% to 59%: Better</li>
      <li>Below 40%: Poor</li>
    </ul>
  </div>
  <div className="flex-1 flex flex-col items-center justify-center w-full sm:w-1/2">
  <div className="text-center mb-4">
    <h3 className="text-2xl font-semibold text-slate-800">Score Preview</h3>
  </div>
  
  <div className="flex flex-col items-center justify-center mb-4">
    <div className="relative flex items-center justify-center w-32 h-32 bg-white border border-gray-300 rounded-full shadow-md">
      <div className="absolute inset-0 bg-gradient-to-t from-green-400 to-green-200 rounded-full opacity-75"></div>
      <span
        className={`text-5xl font-bold z-10 ${
          overallScore >= 80
            ? 'text-green-600'
            : overallScore >= 60
            ? 'text-yellow-600'
            : overallScore >= 40
            ? 'text-orange-600'
            : 'text-red-600'
        }`}
      >
        {overallScore}%
      </span>
    </div>

    <p
      className={`mt-2 text-lg font-semibold ${
        overallScore >= 80
          ? 'text-green-600'
          : overallScore >= 60
          ? 'text-yellow-600'
          : overallScore >= 40
          ? 'text-orange-600'
          : 'text-red-600'
      }`}
    >
      {overallScore >= 80
        ? 'Excellent'
        : overallScore >= 60
        ? 'Good'
        : overallScore >= 40
        ? 'Better'
        : 'Poor'}
    </p>
  </div>
</div>

</div>

        </div>
        <div className="flex justify-center my-8">
          <button
            type="button"
            className="px-8 py-4 w-1/2 bg-sky-500 text-white rounded transition-all duration-300 transform hover:bg-sky-700 hover:scale-105"
            onClick={() => navigate(`/dashboard`)}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamEndPage;
