import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Type Categories</label>
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

export default DomainQuestionsForm;
