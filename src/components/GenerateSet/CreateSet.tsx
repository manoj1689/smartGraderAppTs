import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { handleSetSubmit } from '../../services/api/SetService';
import NotificationBar from '../common/Notification/NotificationBar';
import ThinkPerson from '../../assets/images/GenerateQuestions/CreateSet.webp'
interface SetData {
  sub_category_id: number;
  title: string;
  description: string;
  set_type: number;
  set_level: number;
}

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

  const handleSetTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSetType(Number(event.target.value));
  };

  const handleSetLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSetLevel(Number(event.target.value));
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    const newSet: SetData = {
      sub_category_id: 1, // Assuming this needs to be dynamically generated or retrieved
      title,
      description,
      set_type: setType,
      set_level: setLevel,
    };
  
    console.log('Submitting set:', newSet); // Log the set being submitted
  
    const setDetails=await handleSetSubmit(newSet, navigate, toast);
    console.log("set details of after create set page",setDetails)
  };

  return (
    <div className="container mx-auto p-4">
       <ToastContainer />
       <NotificationBar/>
      <h1 className="text-2xl font-bold mb-4">Create a New Set</h1>
      <div className='flex w-full'>
      <div className='w-2/3'>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Set Type</label>
          <select
            value={setType}
            onChange={handleSetTypeChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value={0}>Type 0</option>
            <option value={1}>Type 1</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Set Level</label>
          <select
            value={setLevel}
            onChange={handleSetLevelChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value={0}>Level 0</option>
            <option value={1}>Level 1</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
      </div>
    <div className='w-1/3'>
    <img src={ThinkPerson} alt="Thinking Man" className='sm:w-9/12 mx-auto px-4' />
    </div>
      </div>
   
    </div>
  );
};

export default CreateSet;

