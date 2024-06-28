import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { FaSpinner, FaCheckCircle, FaCheck } from 'react-icons/fa';

const defaultOptions = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Fullstack', label: 'Fullstack' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Data Science', label: 'Data Science' },
];

const DomainQuestionsForm = ({ onGenerate, loading }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const handleGenerate = (e) => {
    e.preventDefault();
    onGenerate({ topic: selectedTopics.join(','), number_of_questions: numberOfQuestions });
  };

  return (
    <form onSubmit={handleGenerate} className="mb-4">
      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700 mb-2">Type Categories</label>
        <CreatableSelect
          isMulti
          options={defaultOptions}
          onChange={(selectedOptions) => setSelectedTopics(selectedOptions.map(option => option.value))}
          value={defaultOptions.filter(option => selectedTopics.includes(option.value))}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select or type a category"
        />
      </div>
      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700  mb-2">Number of Questions</label>
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
        {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />} Generate Question 
      </button>
    </form>
  );
};

export default DomainQuestionsForm;

