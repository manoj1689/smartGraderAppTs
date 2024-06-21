import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const GeneratedQuestionsList = ({
  generatedQuestions,
  setGeneratedQuestions,
}) => {
  const [open, setOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [currentQuestionText, setCurrentQuestionText] = useState("");

  const handleEditQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setCurrentQuestionText(generatedQuestions[index].question_text);
    setOpen(true);
  };

  const saveEditedQuestion = () => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      question_text: currentQuestionText,
    };
    setGeneratedQuestions(updatedQuestions);
    setOpen(false);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...generatedQuestions];
    updatedQuestions.splice(index, 1);
    setGeneratedQuestions(updatedQuestions);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <span className="text-slate-800 text-md font-semibold leading-4 font-spline">
        AI Generated Questions Set based on your categories below here
      </span>
      {generatedQuestions.map((question, index) => (
        <div key={index} className="flex items-center mb-2 mt-5">
          <span className="w-full p-2">{question.question_text}</span>
          <button
            onClick={() => handleEditQuestion(index)}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteQuestion(index)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        styles={{
          modal: {
            maxWidth: "1000px",
            width: "90%",
            borderRadius: "5px",
          },
        }}
      >
        <div className="mt-5 w-full">
          <div className="my-2 font-spline font-semibold text-gray-800">
            Edit Question
          </div>
          <textarea
            value={currentQuestionText}
            onChange={(e) => setCurrentQuestionText(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={saveEditedQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GeneratedQuestionsList;
