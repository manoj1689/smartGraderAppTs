import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { FaSpinner, FaCheck } from "react-icons/fa";
import { fetchSubCategories } from "../../services/api/CategorySearchService";

const defaultOptions = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Fullstack', label: 'Fullstack' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Data Science', label: 'Data Science' },
];

const DomainQuestionsForm = ({ onGenerate, loading, subCatId }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(4);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [questionType, setQuestionType] = useState(null); // Single value

  const isCodingEnabled = subCatId === 1 || subCatId === 20 || subCatId === 39;

  useEffect(() => {
    const fetchSubCat = async () => {
      const subCategories = await fetchSubCategories(subCatId);
      console.log('Fetched Subcategories:', subCategories);
      setSubCategoryOptions(subCategories);
    };

    if (subCatId) {
      fetchSubCat();
    }
  }, [subCatId]);

  const handleGenerate = (e) => {
    e.preventDefault();
    onGenerate({
      topic: [...selectedTopics, questionType].filter(Boolean).join(","), // Include selected question type
      number_of_questions: numberOfQuestions,
    });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.name;
    setQuestionType((prev) => (prev === value ? null : value)); // Toggle selection
  };

  return (
    <form onSubmit={handleGenerate} className="mb-4">
      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
          Type Categories
        </label>
        {subCatId ? (
          <CreatableSelect
            isMulti
            options={[...subCategoryOptions]}
            onChange={(selectedOptions) =>
              setSelectedTopics(selectedOptions.map((option) => option.label))
            }
            value={[...defaultOptions, ...subCategoryOptions].filter((option) =>
              selectedTopics.includes(option.label)
            )}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Choose Options"
          />
        ) : (
          <CreatableSelect
            isDisabled
            options={[]}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select Category First"
          />
        )}
      </div>

      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
          Number of Questions
        </label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => {
            const value = Math.max(0, Math.min(5, parseInt(e.target.value)));
            setNumberOfQuestions(isNaN(value) ? 0 : value);
          }}
          min="0"
          max="5"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
          Choose Question Type
        </label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="general"
              checked={questionType === 'general'}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2">General Round</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="coding"
              checked={questionType === 'coding'}
              onChange={handleCheckboxChange}
              disabled={!isCodingEnabled}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2">Coding Round</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className={`bg-gray-500 text-white px-4 py-4 sm:w-8/12 justify-center gap-3 mx-auto rounded transition duration-300 hover:bg-gray-700 flex items-center ${
          loading ? "cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : (
          <FaCheck className="mr-2" />
        )}
        Generate Question
      </button>
    </form>
  );
};

export default DomainQuestionsForm;


