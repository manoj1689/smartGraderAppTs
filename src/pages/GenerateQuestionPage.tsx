import React, { useState, useEffect } from "react";
// @ts-ignore
import DomainQuestionsForm from "../components/GenerateQuestions/DomainQuestionsForm";
// @ts-ignore
import ResumeQuestionsForm from "../components/GenerateQuestions/ResumeQuestionsForm";
// @ts-ignore
import JDQuestionsForm from "../components/GenerateQuestions/JDQuestionsForm";
// @ts-ignore
import OwnQuestionsForm from "../components/GenerateQuestions/OwnQuestionsForm";
// @ts-ignore
import GeneratedQuestionsList from "../components/GenerateQuestions/GeneratedQuestionsList";
// @ts-ignore
import ExamSettings from "../components/GenerateQuestions/ExamSettings";
import { FaSpinner, FaCheck } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate,useLocation } from "react-router-dom";
import cheerfulMan from "../assets/images/GenerateQuestions/cheerful-man-working.png";
import fileUpload from "../assets/images/GenerateQuestions/file-uploading.png";
import maleEmployee from "../assets/images/GenerateQuestions/male-employee-tick-in-checkbox.png";
import youngGirl from "../assets/images/GenerateQuestions/young-girl-write-report.png";
import QuestionService, {
  FormData,
  Question,
} from "../services/api/QuestionService";
import { QUESTION_SOURCE } from "../constants/Constants";
import NotificationBar from "../components/common/Notification/NotificationBar";
import { FaLaptopCode } from "react-icons/fa6";
import { handleQuestionSubmit } from "../services/api/QuestionsAddService";

interface QuestionAdd {
  q: string;
  desc: string;
  type: number;
  duration: number;
}

const GenerateQuestionsPage: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { setId,subCatId } = location.state || {};

console.log('Sub Cat  ID:', subCatId);
  const [loading, setLoading] = useState<boolean>(false);
  const [questionSource, setQuestionSource] = useState<string>(
    QUESTION_SOURCE.DOMAIN
  );
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [examTiming, setExamTiming] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [image, setImage] = useState<string>(maleEmployee);
  const [questionList, setQuestionList] = useState<QuestionAdd[]>([]);

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

 

  const handleGenerateQuestions = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const newQuestions = await QuestionService.generateQuestions(
        questionSource,
        data
      );
      setGeneratedQuestions((prevQuestions) => [
        ...prevQuestions,
        ...newQuestions,
      ]);
    } catch (error) {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuestionSet = async () => {
    const set_id = setId;
    const questionsToSubmit = generatedQuestions.map((data) => ({
      q: data.question_text,
      desc: data.expected_answer_format ?? "", // Ensure desc is a string
      type: 0, // Assuming 0 is the default type for 'easy'
      duration: 10, // Default duration of 10
    }));

    setQuestionList(questionsToSubmit);

    try {
      await handleQuestionSubmit(set_id, questionsToSubmit,navigate);
      openModal();
    } catch (error) {
      setError("Failed to save question set. Please try again.");
    }
  };
  
  const handleConfirm = () => {
    const interview = {
      id:setId
    } // Replace with your interview ID logic
    setConfirm(true);
  
    navigate(`/dashboard/question/${interview.id}/instructions`, {
      state: { interview },
    });
    closeModal();
  };
  
  
  return (
    <>
      <div className="container mx-auto w-full h-full">
        <div>
          <NotificationBar />
        </div>
        <div className="container flex flex-col lg:flex-row">
          <div className="flex px-4 py-8 order-2  lg:order-1 w-full lg:w-2/3">
            <div className="flex gap-3">
              <FaLaptopCode size={30} color="gray" />
              <span className=" text-2xl font-semibold font-spline text-gray-700 mb-5">
                Generate Questions
              </span>
            </div>
            <div className="bg-white shadow-md rounded-lg px-4 py-4 ">
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center font-spline mb-4">
                    <input
                      type="radio"
                      id="domain"
                      name="questionSource"
                      value={QUESTION_SOURCE.DOMAIN}
                      onChange={() => setQuestionSource(QUESTION_SOURCE.DOMAIN)}
                      className="mr-2"
                      defaultChecked
                    />
                    <label htmlFor="domain ">By Selecting Different Domain</label>
                  </div>
                  <div className="flex items-center font-spline mb-4">
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
                  <div className="flex items-center font-spline mb-4">
                    <input
                      type="radio"
                      id="jobDescription"
                      name="questionSource"
                      value={QUESTION_SOURCE.JOB_DESCRIPTION}
                      onChange={() =>
                        setQuestionSource(QUESTION_SOURCE.JOB_DESCRIPTION)
                      }
                      className="mr-2"
                    />
                    <label htmlFor="jobDescription">By Writing JD</label>
                  </div>
                  <div className="flex items-center font-spline mb-4">
                    <input
                      type="radio"
                      id="ownQuestions"
                      name="questionSource"
                      value={QUESTION_SOURCE.OWN_QUESTIONS}
                      onChange={() =>
                        setQuestionSource(QUESTION_SOURCE.OWN_QUESTIONS)
                      }
                      className="mr-2"
                    />
                    <label htmlFor="ownQuestions">By Your Own Question</label>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-red-500 flex items-center font-spline">
                  <MdErrorOutline className="mr-2" /> {error}
                </div>
              )}

              {questionSource === QUESTION_SOURCE.DOMAIN && (
                <DomainQuestionsForm
                  onGenerate={handleGenerateQuestions}
                  loading={loading}
                  subCatId={subCatId}
                />
              )}

              {questionSource === QUESTION_SOURCE.RESUME && (
                <ResumeQuestionsForm
                  onGenerate={handleGenerateQuestions}
                  loading={loading}
                />
              )}

              {questionSource === QUESTION_SOURCE.JOB_DESCRIPTION && (
                <JDQuestionsForm
                  onGenerate={handleGenerateQuestions}
                  loading={loading}
                />
              )}

              {questionSource === QUESTION_SOURCE.OWN_QUESTIONS && (
                <OwnQuestionsForm
                  onGenerate={handleGenerateQuestions}
                  loading={loading}
                />
              )}
            </div>

            {generatedQuestions.length > 0 && (
              <>
                <ExamSettings
                  examTiming={examTiming}
                  setExamTiming={setExamTiming}
                />
                <GeneratedQuestionsList
                  generatedQuestions={generatedQuestions}
                  setGeneratedQuestions={setGeneratedQuestions}
                />
                <button
                  onClick={handleSaveQuestionSet}
                  className="mt-4 bg-blue-400 text-white px-4 py-4 font-spline rounded w-8/12 mx-auto justify-center transition duration-300 hover:bg-blue-600 flex items-center"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
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
          <div className="flex image_container order-1 justify-center align-center mx-auto lg:order-2 max-lg:w-2/5 lg:w-1/3">
            <img
              src={image}
              className="max-h-[300px]"
              alt="Fail to load image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateQuestionsPage;
