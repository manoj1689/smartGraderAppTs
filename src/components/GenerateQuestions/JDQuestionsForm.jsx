import React, { useState } from 'react';
import { FaSpinner, FaCheck} from "react-icons/fa";

const JDQuestionsForm = ({ onGenerate, loading }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const handleGenerate = (e) => {
    e.preventDefault();
    onGenerate({ job_description: jobDescription, number_of_questions: numberOfQuestions });
  };

  return (
    <form onSubmit={handleGenerate} className="mb-4">
      <div className="mb-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded"
          placeholder="e.g.,Write Your Job Descriptions"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Questions</label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => {
            const value = Math.max(0, Math.min(5, parseInt(e.target.value)));
            setNumberOfQuestions(isNaN(value) ? 0 : value);
          }}
          min="0"
          max="8"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className={`bg-gray-500 text-white px-4 py-4 sm:w-8/12 justify-center gap-3 mx-auto rounded transition duration-300 hover:bg-gray-700 flex items-center ${loading ? 'cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />} Generate Question Set
      </button>
    </form>
  );
};

export default JDQuestionsForm;
