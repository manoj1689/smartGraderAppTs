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
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

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
      topic: selectedTopics.join(","),
      number_of_questions: numberOfQuestions,
    });
  };

  return (
    <form onSubmit={handleGenerate} className="mb-4">
      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700 mb-2">
          Type Categories
        </label>
        <CreatableSelect
          isMulti
          options={[ ...subCategoryOptions]}
          onChange={(selectedOptions) =>
            setSelectedTopics(selectedOptions.map((option) => option.label))
          }
          value={[...defaultOptions, ...subCategoryOptions].filter((option) =>
            selectedTopics.includes(option.label)
          )}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Category First"
        />
      </div>
      <div className="mt-5 sm:mt-10 mb-4">
        <label className="block text-md font-semibold font-spline text-gray-700  mb-2">
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
        )}{" "}
        Generate Question
      </button>
    </form>
  );
};

export default DomainQuestionsForm;

