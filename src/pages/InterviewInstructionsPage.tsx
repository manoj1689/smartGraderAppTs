import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import { formattedCurrentDate } from '../utils/formatDate';
import BrowserInstructions from '../components/Interview/BrowserInstructions';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmartGrader from "../assets/logos/smartGrader.png";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const InterviewInstructions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { interview } = location.state || {};
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartInterviewClick = () => {
    if (isChecked) {
      navigate(`/dashboard/question/${interview?.id}`, {
        state: { interview }
      });

      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Failed to enter fullscreen mode: ${err.message}`);
      });
    } else {
      toast.error("Please accept the terms and conditions before proceeding.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      } as ToastOptions);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between border-b border-slate-200 bg-sky-100 shadow-md p-4">
        <div className='w-auto'>
          <img src={SmartGrader} alt="Smart Grader" width={140} />
        </div>
      </div>
      <div className='container mx-auto'>
        <NotificationBar/>
      </div>
      <div className="container lg:w-5/6 mx-auto w-full mt-6">
        <div className="flex rounded-md shadow-lg border border-solid m-4 border-black border-opacity-10 bg-white">
          <div className="w-full p-6">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-4">Interview Instructions (Please Read Carefully)</h1>
            <div className='flex w-full flex-col md:flex-row gap-6 my-4'>
              <div className="space-y-4 w-full md:w-1/2 rounded-md border border-solid bg-sky-100 border-gray-300 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800">Interview Details</h2>
                <p className="text-base text-slate-700"><strong>Name:</strong> {interview?.title || '-'}</p>
                <p className="text-base text-slate-700"><strong>Date:</strong> {formattedCurrentDate}</p>
                <p className="text-base text-slate-700"><strong>Duration:</strong> {interview?.duration} mins</p>
                <p className="text-base text-slate-700"><strong>Description:</strong> {interview?.description}</p>
              </div>

       
         

<div className="space-y-4 w-full md:w-1/2 rounded-md border border-solid border-gray-300 bg-sky-100 p-6 shadow-sm">
  <h4 className="text-lg font-semibold text-slate-800">Interview Instructions</h4>
  <div className="space-y-2 text-base leading-6 text-slate-700 font-spline">
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>You will need to put on your camera throughout this interview.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Ensure your camera and microphone are working.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Before you start the interview you will need to give browser access to your camera.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Make sure you are in a quiet environment.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>You can listen to the questions and also record your answers.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Do not open any other tabs or use any external help.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Be sure to enter the full-screen mode before starting the interview.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Once you click Next, you cannot go back to the previous page.</p>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 flex items-center justify-center">
        <VscDebugBreakpointLog className="text-slate-700" />
      </div>
      <p>Click the <strong>Start Interview</strong> button to begin.</p>
    </div>
  </div>
</div>
</div>

            <div className="rounded-md border border-solid border-gray-300 p-6 shadow-sm bg-sky-100">
              <div >
                <BrowserInstructions />
              </div>
            </div>

            <div className='flex items-start mt-6  text-slate-700'>
              <input
                type="checkbox"
                id='disclaimer'
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600 mt-1"
              />
              <label htmlFor="disclaimer" className='ml-3 text-orange-700'>
                I have read and understood the instructions. All Computer Hardware allotted to me is in proper working condition. I agree that in case of not adhering to the instructions, I will be disqualified from taking the exam.
              </label>
            </div>

            <div className="flex flex-col lg:flex-row w-full my-12 lg:w-5/6 mx-auto justify-center gap-4">
              <button
                type="button"
                className="p-4 w-full lg:w-1/2 bg-slate-500 text-white rounded hover:bg-slate-600 transition duration-300"
                onClick={() => navigate(`/dashboard`)}
              >
                Go back
              </button>
              <button
                type="button"
                className="p-4 w-full lg:w-1/2 bg-sky-500 text-white rounded border border-sky-500 border-solid hover:bg-sky-700 hover:border-sky-700 transition duration-300"
                onClick={handleStartInterviewClick}
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default InterviewInstructions;



