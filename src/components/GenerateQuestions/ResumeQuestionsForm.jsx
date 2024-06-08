import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

const ResumeQuestionsForm = ({ onGenerate, loading }) => {
  const [resume, setResume] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    onDrop: acceptedFiles => setResume(acceptedFiles[0])
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    onGenerate({ resume, number_of_questions: numberOfQuestions });
  };

  return (
    <form onSubmit={handleGenerate} className="mb-4">
      <div className="mb-4">
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 text-center">
          <input {...getInputProps()} />
          {resume ? <p>{resume.name}</p> : <p>Drag 'n' drop a resume file here, or click to select one</p>}
        </div>
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

export default ResumeQuestionsForm;
