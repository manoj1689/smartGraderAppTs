import React, { useState } from 'react';
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

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
          placeholder="Write Your Job Descriptions"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Questions</label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700 flex items-center ${loading ? 'cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaCheckCircle className="mr-2" />} Generate Question Set
      </button>
    </form>
  );
};

export default JDQuestionsForm;
