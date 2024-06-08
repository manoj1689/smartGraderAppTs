import React, { useState } from "react";

const EvaluationCard = ({ record }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6 border border-gray-300 ">
      <div
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <button
            className={`text-2xl mr-4 w-10 h-10 flex items-center justify-center rounded-full 
              ${isExpanded ? "text-white bg-blue-500" : "text-black bg-white border border-black"}`}
          >
            {isExpanded ? "−" : "+"}
          </button>
          <div className="flex-1">
            <div className="text-xl font-semibold text-gray-800">{record.question}</div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-6">
          <div className="mb-4">
            <span className="font-medium text-[#01AFF4]"><b>Your Answer:</b></span>
            <div className="text-gray-700 mt-1">{record.user_answer}</div>
          </div>
          <hr className="my-4 border-t-2 border-gray-200"/>
          <div className="mb-4 bg-gray-100 p-4 rounded-md">
            <ul className="space-y-4">
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Knowledge Level:</b></span>
                <div className="text-gray-800 mt-1">{record.knowledge_level}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Factual Accuracy:</b></span>
                <div className="text-gray-800 mt-1">{record.factual_accuracy}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Factual Accuracy Explanation:</b></span>
                <div className="text-gray-800 mt-1">{record.factual_accuracy_explanation}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Completeness:</b></span>
                <div className="text-gray-800 mt-1">{record.completeness}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Completeness Explanation:</b></span>
                <div className="text-gray-800 mt-1">{record.completeness_explanation}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Relevance:</b></span>
                <div className="text-gray-800 mt-1">{record.relevance}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Relevance Explanation:</b></span>
                <div className="text-gray-800 mt-1">{record.relevance_explanation}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Coherence:</b></span>
                <div className="text-gray-800 mt-1">{record.coherence}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Coherence Explanation:</b></span>
                <div className="text-gray-800 mt-1">{record.coherence_explanation}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Score:</b></span>
                <div className="text-gray-800 mt-1">{record.score}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Input Tokens:</b></span>
                <div className="text-gray-800 mt-1">{record.input_tokens}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Output Tokens:</b></span>
                <div className="text-gray-800 mt-1">{record.output_tokens}</div>
              </li>
              <li>
                <span className="font-medium text-[#01AFF4]"><b>Final Evaluation:</b></span>
                <div className="text-gray-800 mt-1">{record.final_evaluation}</div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationCard;



// import React, { useState } from "react";

// const EvaluationCard = ({ record }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="bg-white rounded shadow-md p-4 mb-4">
//       <div
//         className="cursor-pointer"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <div className="flex justify-between items-center">
//           <div>
//             <div className="text-lg font-semibold">{record.question}</div>
//           </div>
//           <button className="text-xl">
//             {isExpanded ? "−" : "+"}
//           </button>
//         </div>
//       </div>
//       {isExpanded && (
//         <div className="mt-4">
//           <div className="mb-2">
//             <span className="text-blue-500">Your Answer:</span> {record.answer}
//           </div>
//           <div className="mb-2">
//             <span className="font-semibold">Feedback</span>
//             <ul>
//               <li>Factual Accuracy: {record.feedback.factualAccuracy}</li>
//               <li>Completeness: {record.feedback.completeness}</li>
//               <li>Relevance: {record.feedback.relevance}</li>
//               <li>Coherence: {record.feedback.coherence}</li>
//               <li>Scoring: {record.feedback.scoring}</li>
//             </ul>
//           </div>
//           <div className="text-lg font-bold">
//             Final Score: {record.score}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationCard;
