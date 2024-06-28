import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate,useLocation } from 'react-router-dom';
import NotificationBar from '../../common/Notification/NotificationBar';
import { FaLaptopCode } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Coding from "../../../assets/images/Organisation/coding.png";
import DatePicker from "react-datepicker";
import { MdArrowOutward } from "react-icons/md";
import { CreateJobService } from '../../../services/api/CreateJobService';

const CreateJobs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSetId = location.state?.selectedSetId || null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    emails,
    currentEmail,
    jobData,
    startDate,
    endDate,
    setJobData,
    setStartDate,
    setEndDate,
    handleInputChange,
    handleKeyPress,
    getJobInitial,
    handleSaveAndPublish,
    handleDelete,
  } = CreateJobService();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto w-full h-full px-4 md:px-10">
      <NotificationBar />

      <div>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:w-2/3 order-2 lg:order-1'>
            <div className="flex flex-row items-center max-lg:my-5 space-x-4">
              <FaLaptopCode size={30} color="5E676B" />
              <span className="text-sm font-spline font-semibold">
                Current Job Opening
              </span>
            </div>
            <div className="w-full mt-10 text-lg font-medium leading-6 max-md:max-w-full">
              Job Title
            </div>
            <div className="flex gap-2.5 justify-between items-start px-3.5 pt-3.5 pb-5 mt-6 w-full bg-sky-50 rounded-md border border-sky-500 border-solid max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col mt-2">
                <div className="text-lg font-medium leading-6">
                  Name- {jobData.title}
                </div>
                <div className="mt-3 text-base leading-6">
                  Experience required - {jobData.experience}
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="shrink-0 aspect-square w-[31px] bg-sky-500 text-white flex items-center justify-center rounded-full">
                  {getJobInitial(jobData.title)}
                </div>
                {jobData.title ? <FaEdit onClick={openModal} size={40} /> : <MdAddBox onClick={openModal} size={40} />}
              </div>
            </div>

            <button className="flex justify-center items-center self-stretch px-4 py-5 my-5 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid max-md:px-5" onClick={() => navigate('selectset')}>
              <div className="flex gap-2.5">
                <div>Select your Question Sets</div>
              </div>
            </button>
              <div>Your Selected Id Of Question Set : {selectedSetId}</div>
            <div className="flex gap-5 text-lg leading-6 max-md:flex-wrap">
              <div className="flex flex-col flex-1 grow shrink-0 px-5 basis-0 w-fit">
                <div className="font-medium text-slate-800">Interview Start Date </div>
                <DatePicker className="flex gap-2.5 justify-between px-4 py-5 mt-4 bg-white rounded-md border border-solid border-neutral-500 text-neutral-500" selected={startDate} onChange={(date) => setStartDate(date as Date)} />
              </div>
              <div className="flex flex-col flex-1 grow shrink-0 px-5 basis-0 w-fit">
                <div className="font-medium text-slate-800">Interview End Date </div>
                <DatePicker className="flex gap-2.5 justify-between px-4 py-5 mt-4 bg-white rounded-md border border-solid border-neutral-500 text-neutral-500" selected={endDate} onChange={(date) => setEndDate(date as Date)} />
              </div>
            </div>

            <div className="mt-6">Send Job Invites</div>
            <div className='rounded-md border min-h-32 border-gray-500 border-solid p-4'>
              <div className="mt-4">
                <div className='flex flex-wrap gap-2'>
                  {emails.map((email, index) => (
                    <div key={index} className="justify-center px-5 py-2.5 text-xs leading-4 text-sky-500 whitespace-nowrap bg-sky-50 border border-sky-500 w-auto border-solid rounded-[30px]">
                      {email}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={currentEmail}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter email..."
                  className="mt-4 px-4 py-2 focus:outline-none focus:ring-0 focus:border-transparent w-full"
                />
              </div>
            </div>

            <button className="flex justify-center items-center self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full sm:w-2/3 max-md:px-5" onClick={handleSaveAndPublish}>
              <div className="flex gap-2.5">
                <div className='flex items-center gap-3'> <span>Save & Publish This Job </span><span ><MdArrowOutward /></span></div>
              </div>
            </button>
            <button className="flex justify-center items-center mx-auto self-stretch px-4 py-5 my-10 text-red-500 bg-white rounded-md border border-gray-400 w-full sm:w-2/3 max-md:px-5" onClick={handleDelete}>
              <div className="flex gap-2.5">
                <div>Delete</div>
              </div>
            </button>
          </div>

          <div className='flex justify-center items-center mt-6 order-1 lg:order-2 lg:w-1/3'>
            <img loading="lazy" alt='coding' src={Coding} />
          </div>
        </div>
      </div>

      {isModalOpen && 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">{jobData.title ? 'Edit' : 'Add'} Job</h2>
            <div className="mb-4">
              <label className="block mb-2">Job Title</label>
              <input 
                type="text" 
                value={jobData.title} 
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Experience Required</label>
              <input 
                type="text" 
                value={jobData.experience} 
                onChange={(e) => setJobData({ ...jobData, experience: e.target.value })} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button 
                onClick={closeModal} 
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2">
                Cancel
              </button>
              <button 
                onClick={() => {
                  closeModal();
                }} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default CreateJobs;
