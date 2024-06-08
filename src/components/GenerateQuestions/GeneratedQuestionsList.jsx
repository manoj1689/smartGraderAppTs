import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const GeneratedQuestionsList = ({ generatedQuestions, setGeneratedQuestions }) => {
  const handleEditQuestion = (index, newText) => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions[index] = { ...updatedQuestions[index], question_text: newText };
    setGeneratedQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions.splice(index, 1);
    setGeneratedQuestions(updatedQuestions);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">Generated Questions</h2>
      {generatedQuestions.map((question, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-full p-2 border border-gray-300 rounded">{question.question_text}</span>
          <button onClick={() => handleEditQuestion(index, prompt("Edit question", question.question_text))} className="ml-2 text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button onClick={() => handleDeleteQuestion(index)} className="ml-2 text-red-500 hover:text-red-700">
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GeneratedQuestionsList;
