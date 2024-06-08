
import React, { useState, useEffect } from "react";
import DomainQuestionsForm from "../components/GenerateQuestions/DomainQuestionsForm";
import ResumeQuestionsForm from "../components/GenerateQuestions/ResumeQuestionsForm";
import JDQuestionsForm from "../components/GenerateQuestions/JDQuestionsForm";
import OwnQuestionsForm from "../components/GenerateQuestions/OwnQuestionsForm";
import GeneratedQuestionsList from "../components/GenerateQuestions/GeneratedQuestionsList";
import ExamSettings from "../components/GenerateQuestions/ExamSettings";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import cheerfulMan from "../assets/images/GenerateQuestions/cheerful-man-working.png";
import fileUpload from "../assets/images/GenerateQuestions/file-uploading.png";
import maleEmployee from "../assets/images/GenerateQuestions/male-employee-tick-in-checkbox.png";
import youngGirl from "../assets/images/GenerateQuestions/young-girl-write-report.png";
import QuestionService, { FormData, Question } from "../services/api/QuestionService";
import { QUESTION_SOURCE } from "../constants/constants";

const GenerateQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [questionSource, setQuestionSource] = useState<string>(QUESTION_SOURCE.DOMAIN);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [examTiming, setExamTiming] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [image, setImage] = useState<string>(maleEmployee);

  useEffect(() => {
    // Update image based on question source
    switch (questionSource) {
      case QUESTION_SOURCE.DOMAIN:
        setImage(maleEmployee);
        break;
      case QUESTION_SOURCE.RESUME:
        setImage(fileUpload);
        break;
      case QUESTION_SOURCE.JOB_DESCRIPTION:
        setImage(youngGirl);
        break;
      case QUESTION_SOURCE.OWN_QUESTIONS:
        setImage(cheerfulMan);
        break;
      default:
        setImage(maleEmployee);
    }
  }, [questionSource]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setConfirm(true);
    navigate('/dashboard/interviewscreen');
    closeModal();
  };

  const handleGenerateQuestions = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const newQuestions = await QuestionService.generateQuestions(questionSource, data);
      setGeneratedQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
    } catch (error) {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuestionSet = async () => {
    try {
      openModal();
      setLoading(true);
      await QuestionService.saveQuestionSet(generatedQuestions, examTiming);
      alert("Question set saved successfully!");
    } catch (error) {
      setError("Failed to save question set. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col mx-auto lg:flex-row">
      <div className="data_container mx-auto py-8 px-4 order-2 md:ml-10 lg:order-1 w-full lg:w-4/6">
        <h1 className="text-3xl font-bold mb-6">Generate Exam Question Set</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Set Your Own Questions
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="domain"
                  name="questionSource"
                  value={QUESTION_SOURCE.DOMAIN}
                  onChange={() => setQuestionSource(QUESTION_SOURCE.DOMAIN)}
                  className="mr-2"
                  defaultChecked
                />
                <label htmlFor="domain">By Selecting Different Domain</label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="resume"
                  name="questionSource"
                  value={QUESTION_SOURCE.RESUME}
                  onChange={() => setQuestionSource(QUESTION_SOURCE.RESUME)}
                  className="mr-2"
                />
                <label htmlFor="resume">By Uploading Resume</label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="jobDescription"
                  name="questionSource"
                  value={QUESTION_SOURCE.JOB_DESCRIPTION}
                  onChange={() => setQuestionSource(QUESTION_SOURCE.JOB_DESCRIPTION)}
                  className="mr-2"
                />
                <label htmlFor="jobDescription">By Writing JD</label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="ownQuestions"
                  name="questionSource"
                  value={QUESTION_SOURCE.OWN_QUESTIONS}
                  onChange={() => setQuestionSource(QUESTION_SOURCE.OWN_QUESTIONS)}
                  className="mr-2"
                />
                <label htmlFor="ownQuestions">By Your Own Question Set</label>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-500 flex items-center">
              <MdErrorOutline className="mr-2" /> {error}
            </div>
          )}

          {questionSource === QUESTION_SOURCE.DOMAIN && (
            <DomainQuestionsForm onGenerate={handleGenerateQuestions} loading={loading} />
          )}

          {questionSource === QUESTION_SOURCE.RESUME && (
            <ResumeQuestionsForm onGenerate={handleGenerateQuestions} loading={loading} />
          )}

          {questionSource === QUESTION_SOURCE.JOB_DESCRIPTION && (
            <JDQuestionsForm onGenerate={handleGenerateQuestions} loading={loading} />
          )}

          {questionSource === QUESTION_SOURCE.OWN_QUESTIONS && (
            <OwnQuestionsForm onGenerate={handleGenerateQuestions} loading={loading} />
          )}
        </div>

        {generatedQuestions.length > 0 && (
          <>
            <ExamSettings examTiming={examTiming} setExamTiming={setExamTiming} />
            <GeneratedQuestionsList
              generatedQuestions={generatedQuestions}
              setGeneratedQuestions={setGeneratedQuestions}
            />
            <button
              onClick={handleSaveQuestionSet}
              className="mt-4 bg-green-500 text-white px-8 py-4 rounded-full transition duration-300 hover:bg-green-700 flex items-center"
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCheckCircle className="mr-2" />
              )}
              Save Question Set
            </button>
          </>
        )}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-md">
              <div className="text-xl font-bold mb-4">
                Question Generated Successfully
              </div>
              <div className="text-gray-700 mb-4">
                Do you want to start the interview assessment?
              </div>
              <div className="flex justify-around">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex image_container order-1 justify-center align-center mx-auto lg:order-2 max-lg:w-2/5 lg:w-2/6">
        <img src={image} className="h-1/2" alt="Fail to load image" />
      </div>
    </div>
  );
};

export default GenerateQuestionsPage;
