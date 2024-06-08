import React, { useState } from 'react';
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

const OwnQuestionsForm = ({ onGenerate, loading }) => {
  const [ownQuestions, setOwnQuestions] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    onGenerate({ ownQuestions });
  };

  return (
    <form onSubmit={handleGenerate} className="mb-4">
      <div className="mb-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded"
          placeholder="Write your own questions, separated by a new line"
          value={ownQuestions}
          onChange={(e) => setOwnQuestions(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700 flex items-center ${loading ? 'cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaCheckCircle className="mr-2" />} Add Questions
      </button>
    </form>
  );
};

export default OwnQuestionsForm;
