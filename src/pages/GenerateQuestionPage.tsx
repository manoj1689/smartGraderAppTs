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
import { useNavigate, useLocation } from "react-router-dom";
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
import { ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { handleSetSubmit } from "../services/api/SetService";

import ThinkPerson from "../../assets/images/GenerateQuestions/CreateSet.webp";
import { MdArrowOutward } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { fetchCategories } from "../services/api/CategorySearchService";
interface QuestionAdd {
  q: string;
  desc: string;
  type: number;
  duration: number;
}

interface SetData {
  sub_category_id: number;
  title: string;
  description: string;
  set_type: number;
  set_level: number;
}

const GenerateQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setId, subCatId } = location.state || {};

  console.log("Sub Cat  ID:", subCatId);
  const [loading, setLoading] = useState<boolean>(false);
  const [questionSource, setQuestionSource] = useState<string>(QUESTION_SOURCE.JOB_DESCRIPTION);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [examTiming, setExamTiming] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [image, setImage] = useState<string>(maleEmployee);
  const [questionList, setQuestionList] = useState<QuestionAdd[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [setType, setSetType] = useState<number>(0);
  const [setLevel, setSetLevel] = useState<number>(0);
  const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
  const [category, setCategory] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<any>({});

  const setLevelOptions = [
    { value: 0, label: "Easy" },
    { value: 1, label: "Medium" },
    { value: 2, label: "Hard" },
  ];

  useEffect(() => {
    setExamTiming(generatedQuestions.length * 2);
  }, [generatedQuestions]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setFormErrors((prevErrors: any) => ({ ...prevErrors, title: "" }));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    setFormErrors((prevErrors: any) => ({ ...prevErrors, description: "" }));
  };

  const handleSetTypeChange = (selectedOption: any) => {
    setSetType(selectedOption.value);
  };

  const handleSetLevelChange = (selectedOption: any) => {
    setSetLevel(selectedOption.value);
    setFormErrors((prevErrors: any) => ({ ...prevErrors, setLevel: "" }));
  };

  const handleCategoryChange = (selectedOption: any) => {
    setCategory(selectedOption.value);
    setFormErrors((prevErrors: any) => ({ ...prevErrors, category: "" }));
  };

  const validateForm = () => {
    const errors: any = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
    if (!category) errors.category = "Specialization is required.";
    if (!setLevel) errors.setLevel = "Set level is required.";
    return errors;
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryData = await fetchCategories();
      console.log("the categoryData", categoryData);

      const categoryOptions = Object.values(categoryData).map((category: any) => ({
        value: category.id,
        label: category.name,
        subcategories: Object.values(category.subcategories).map((subcategory: any) => ({
          value: subcategory.id,
          label: subcategory.name,
        })),
      }));

      setCategories(categoryOptions);
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
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
    navigate('/dashboard');
    setIsOpen(false);
  };

  const handleGenerateQuestions = async (data: FormData) => {
    setLoading(true);
    setError("");

    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      if (!questionSource) {
        throw new Error("Question source is not defined.");
      }

      const newQuestions = await QuestionService.generateQuestions(questionSource, data);

      setGeneratedQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
    } catch (error) {
      console.error("Error generating questions:", error);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuestionSet = async (setId: any) => {
    const questionsToSubmit = generatedQuestions.map((data) => ({
      q: data.question_text,
      desc: data.expected_answer_format ?? "",
      type: 0,
      duration: 10,
    }));

    setQuestionList(questionsToSubmit);

    try {
      await handleQuestionSubmit(setId, questionsToSubmit, navigate);
      openModal();
    } catch (error) {
      setError("Failed to save question set. Please try again.");
    }
  };

  const handleFormSubmitAndSaveQuestions = async (event: FormEvent) => {
    event.preventDefault();

    const newSet: SetData = {
      sub_category_id: category,
      title,
      description,
      set_type: 0,
      set_level: setLevel,
    };

    console.log("Submitting set:", newSet);

    try {
      const setId = await handleSetSubmit(newSet, navigate, toast);
      console.log("Getting setId on Question Page inside handleFormSubmit", setId);

      if (!setId) {
        throw new Error("Failed to retrieve set ID.");
      }

      await handleSaveQuestionSet(setId);
    } catch (error) {
      setError("Failed to save question set. Please try again.");
    }
  };
  const handleConfirm = () => {
    const interview = {
      id: setId // Ensure setId is properly defined and holds the interview ID
    };
  
    setConfirm(true);
  
    navigate(`/dashboard/question/${interview.id}/instructions`, {
      state: { interview },
    });
  
    closeModal(); // Close the modal after navigating
  };
  
  
  // Your component code, such as form JSX, button handlers, etc.

  return (
    <>
      <div className="container mx-auto w-full h-full">
        <div>
          <NotificationBar />
        </div>
        <div className="text-2xl px-4 font-spline font-semibold text-slate-700 ">
          <span>AI Question Set Creation</span>
        </div>
      
        <div className="container flex flex-col lg:flex-row">
          <div className="flex flex-col px-4 py-8 order-2  lg:order-1 w-full lg:w-2/3">
          <form onSubmit={handleGenerateQuestions} noValidate>
      <div className="w-full p-4">
        <div className="flex flex-col gap-5">
          <div className="mb-4 w-full ">
            <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="justify-center items-start p-4 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
              required
              placeholder="e.g., Software Engineer"
            />
            <div className="text-red-500">
              {formErrors.title}
            </div>
          </div>
          <div className="mb-4 w-full ">
            <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="justify-center items-start h-32 p-4 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
              required
              placeholder="e.g., About Job"
            />
            <div className="text-red-500">
              {formErrors.description}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="mb-4 w-full lg:w-1/2">
            <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
              Specialization
            </label>
            <Select
              options={categories}
              onChange={handleCategoryChange}
              className="w-full"
              required
              placeholder="Software Development"
            />
            <div className="text-red-500">
              {formErrors.category}
            </div>
          </div>
          <div className="mb-4 w-full lg:w-1/2">
            <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
              Set Level
            </label>
            <Select
              options={setLevelOptions}
              onChange={handleSetLevelChange}
              className="w-full"
              required
              placeholder="Hard"
            />
            <div className="text-red-500">
              {formErrors.setLevel}
            </div>
          </div>
        </div>
        {/* {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
          disabled={loading}
        >
          Generate Questions
        </button> */}
      </div>
    </form>
            <div className="text-2xl font-spline font-semibold my-4 text-slate-700 ">
              Submit AI Questions
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
                     // defaultChecked
                    />
                    <label htmlFor="domain ">
                      By Selecting Different Domain
                    </label>
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
                      defaultChecked
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
                  subCatId={category}
                  
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
                  generatedQuestions={generatedQuestions}
                  examTiming={examTiming}
                  setExamTiming={setExamTiming}
                />
                <GeneratedQuestionsList
                  generatedQuestions={generatedQuestions}
                  setGeneratedQuestions={setGeneratedQuestions}
                />
                <button
                  onClick={handleFormSubmitAndSaveQuestions}
                
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
                  <div className="text-xl text-sky-500 font-bold mb-4">
                    Question Generated Successfully
                  </div>
                  <hr className="border-t-4 border-gray-300  my-4" />
                  <div className="text-gray-700 my-8">
                    Do you want to start the interview assessment?
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={closeModal}
                      className="bg-gray-400 hover:bg-gray-500 text-white w-full px-4 py-4 rounded mr-2"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="bg-blue-400  hover:bg-blue-600 w-full text-white px-4 py-2 rounded"
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
