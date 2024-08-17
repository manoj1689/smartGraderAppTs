import React, { useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import ReactAudioPlayer from 'react-audio-player';

const EvaluationCard = ({ record }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const calculatePieChartData = () => {
    const total = record.score * 10; // Assuming score is out of 100
    const remaining = 100 - total;

    return [
      { title: 'Score', value: total, color: '#3B82F6' }, // Modern blue
      { title: 'Remaining', value: remaining, color: '#E5E7EB' }, // Light gray
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
  
  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
    <div className="flex items-center space-x-4 w-full ">
    <div className="flex w-1/6 justify-center items-center">
    <div
        className={`relative flex  items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform ${
          isExpanded ? "bg-gradient-to-t from-blue-500 to-blue-300 scale-110" : "bg-gray-300 scale-100"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-300 rounded-full opacity-75"></div>
        <span className="text-2xl font-bold text-white z-10">
          {isExpanded ? "−" : "+"}
        </span>
      </div>
    </div>
     
      <div className="text-xl flex w-5/6 font-semibold text-gray-800">{record.question}</div>
    </div>
    <div className="w-full md:w-1/6 flex flex-row justify-center items-center space-y-2">
      <div className="flex  items-center space-x-2">
        <span className="text-gray-600 font-medium">Score:</span>
        <span className="text-blue-600 font-semibold text-lg">{record.score}</span>
      </div>
      <div className="w-24 h-24">
        <PieChart
          data={calculatePieChartData()}
          lineWidth={20}
          radius={30}
          // Add other props if needed
        />
      </div>
    </div>

</div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="text-blue-600 font-medium text-lg mb-2">Your Answer:</div>
            <div className="text-gray-800">{record.user_answer}</div>
          </div>
          <div>
            <ReactAudioPlayer
              src="../VoiceRecords/introVideo.mpeg"
              autoPlay
              controls
              className="w-full mt-4"
            />
          </div>
          <hr className="my-4 border-gray-200"/>
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 border border-gray-200">
  <div className="text-blue-600 font-bold text-lg mb-4">Evaluation Details</div>
  <ul className="space-y-4">
    {[
      { label: 'Knowledge Level', value: record.knowledge_level, icon: '📚' },
      { label: 'Factual Accuracy', value: record.factual_accuracy, icon: '✔️' },
      { label: 'Factual Accuracy Explanation', value: record.factual_accuracy_explanation, icon: '📝' },
      { label: 'Completeness', value: record.completeness, icon: '✅' },
      { label: 'Completeness Explanation', value: record.completeness_explanation, icon: '🗒️' },
      { label: 'Relevance', value: record.relevance, icon: '🔍' },
      { label: 'Relevance Explanation', value: record.relevance_explanation, icon: '💡' },
      { label: 'Coherence', value: record.coherence, icon: '🔗' },
      { label: 'Coherence Explanation', value: record.coherence_explanation, icon: '🧩' },
      { label: 'Score', value: record.score, icon: '⭐' },
      { label: 'Final Evaluation', value: record.final_evaluation, icon: '📊' },
    ].map(({ label, value, icon }) => (
      <li key={label} className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-md transition-colors duration-300">
        <div className="text-xl">{icon}</div>
        <div>
          <div className="font-medium text-blue-600 text-xl">{label}:</div>
          <div className="text-gray-800 mt-1">{value}</div>
        </div>
      </li>
    ))}
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
