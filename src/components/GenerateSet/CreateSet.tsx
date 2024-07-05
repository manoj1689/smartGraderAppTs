
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import { handleSetSubmit } from '../../services/api/SetService';
import NotificationBar from '../common/Notification/NotificationBar';
import ThinkPerson from '../../assets/images/GenerateQuestions/CreateSet.webp';
import { MdArrowOutward } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

interface SetData {
  sub_category_id: number;
  title: string;
  description: string;
  set_type: number;
  set_level: number;
}

const setTypeOptions = [
  { value: 0, label: 'Type 0' },
  { value: 1, label: 'Type 1' },
  // Add more options as needed
];

const setLevelOptions = [
  { value: 0, label: 'Easy' },
  { value: 1, label: 'Medium' },
  { value: 2, label: 'Hard' },
  // Add more options as needed
];

const CreateSet: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [setType, setSetType] = useState<number>(0);
  const [setLevel, setSetLevel] = useState<number>(0);
  const navigate = useNavigate();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSetTypeChange = (selectedOption: any) => {
    setSetType(selectedOption.value);
  };

  const handleSetLevelChange = (selectedOption: any) => {
    setSetLevel(selectedOption.value);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    const newSet: SetData = {
      sub_category_id: 0, // Assuming this needs to be dynamically generated or retrieved
      title,
      description,
      set_type: setType,
      set_level: setLevel,
    };
  
    console.log('Submitting set:', newSet); // Log the set being submitted
  
    const setDetails = await handleSetSubmit(newSet, navigate, toast);
    console.log("set details after create set page", setDetails);
  };

  return (
    <div className="container lg:w-5/6 mx-auto w-full h-full">
      <ToastContainer />
      <NotificationBar />
      <div className="flex items-center gap-3 px-4 py-4"> <span><IoIosCreate size={30} color='gray' /></span> <span className='text-2xl font-semibold font-spline text-gray-700'>Generate Question Set</span></div>
      <div className='flex flex-col lg:flex-row px-4 py-4'>
        <div className='data_container mx-auto px-4 py-8 order-2 md:ml-10 lg:order-1 w-full lg:w-2/3'>
          <form onSubmit={handleFormSubmit} className='w-full sm:5/6 '>
            <div className="mb-4">
              <label className="block text-md font-semibold font-spline text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter the title of the set"
                className="justify-center items-start p-4 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold font-spline text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter a brief description"
                className="justify-center items-start p-5 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold font-spline text-gray-700 mb-2">Set Type</label>
              <Select
                options={setTypeOptions}
                onChange={handleSetTypeChange}
                className="w-full"
                placeholder="Select the type of set"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold font-spline text-gray-700 mb-2">Set Level</label>
              <Select
                options={setLevelOptions}
                onChange={handleSetLevelChange}
                className="w-full"
                placeholder="Select the difficulty level"
                required
              />
            </div>
            <button
              className="flex justify-center items-center self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-gray-500 hover:bg-gray-600 hover:border-gray-600 rounded-md border border-gray-500 border-solid w-full lg:w-3/4 max-md:px-5"
              type="submit"
            >
              <div className="flex gap-2.5">
                <div className="flex items-center gap-3">
                  <span>Continue With Question Set</span>
                  <span><MdArrowOutward /></span>
                </div>
              </div>
            </button>
          </form>
        </div>
        <div className='flex  order-1 justify-center align-center mx-auto lg:order-2  lg:w-1/3'>
          <div>
            <img src={ThinkPerson} alt="Thinking Man" className='w-64 md:w-80 mx-auto px-4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSet;
