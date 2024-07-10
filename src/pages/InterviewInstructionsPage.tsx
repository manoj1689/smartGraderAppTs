import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import { formattedCurrentDate } from '../utils/formatDate';
import BrowserInstructions from '../components/Interview/BrowserInstructions';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmartGrader from "../assets/logos/smart-logo.png";
import { FaUser } from "react-icons/fa";

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
        className: 'rounded-full bg-grey-500 text-black p-4 text-center',
        bodyClassName: 'text-black',
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } as ToastOptions);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className='w-auto p-4 '>
          <img src={SmartGrader} alt="Smart Grader" width={140} />
        </div>
      </div>
      <div className="container lg:w-5/6 mx-auto w-full">
        <div className="flex rounded-md border border-solid m-4 border-black border-opacity-10">
          <div className="w-full bg-white p-4">
            <h1 className="text-2xl font-bold text-center text-slate-800">Interview Instructions. (Please read carefully)</h1>
            <div className='flex w-full flex-col md:flex-row gap-4 my-4'>
              <div className="space-y-2 w-full md:w-1/2 rounded-md border border-solid my-4 border-black border-opacity-10 p-4">
                <h2 className="text-lg font-bold text-slate-900">Interview Details</h2>
                <p className="text-base text-slate-700"><strong>Name:</strong> {interview?.title || '-'}</p>
                <p className="text-base text-slate-700"><strong>Date:</strong> {formattedCurrentDate}</p>
                <p className="text-base text-slate-700"><strong>Duration:</strong> {interview?.duration} mins</p>
                <p className="text-base text-slate-700"><strong>Description:</strong> {interview?.description}</p>
              </div>

              <div className="space-y-2 w-full md:w-1/2 rounded-md border border-solid my-4 border-black border-opacity-10 p-4">
                <h4 className="text-lg font-bold text-slate-800">Interview Instructions</h4>
                <div className="space-y-2 text-base leading-5 text-slate-700 font-spline">
                  <p>You will need to put on your camera throughout this interview.</p>
                  <p>Ensure your camera and microphone are working.</p>
                  <p>Before you start the interview you will need to give browser access to your camera.</p>
                  <p>Make sure you are in a quiet environment.</p>
                  <p>You can listen to the questions and also record your answers.</p>
                  <p>Do not open any other tabs or use any external help.</p>
                  <p>Be sure to enter the full screen mode before starting the interview.</p>
                  <p>Once you click Next, you cannot go back to the previous page.</p>
                  <p>Click the <strong>Start Interview</strong> button to begin.</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-solid my-4 border-black border-opacity-10 p-4">
              <div className="mt-4">
                <BrowserInstructions />
              </div>
            </div>

            <span className='highlightext flex mt-5 text-red-500 gap-2'>
              <div className='checkboxDiv'>
                <input
                  type="checkbox"
                  id='disclaimer'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              I have read and understood the instructions. All Computer Hardwares allotted to me are in proper working condition. I agree that in case of not adhering to the instructions, I will be disqualified from taking the exam.
            </span>

            <div className="flex w-full my-12 lg:w-5/6 mx-auto justify-center space-x-4">
              <button
                type="button"
                className="p-4 w-full lg:w-1/2 bg-slate-500 text-white rounded hover:bg-slate-600"
                onClick={() => navigate(`/dashboard`)}
              >
                Go back
              </button>
              <button
                type="button"
                className="p-4 bg-blue-600 w-full  lg:w-1/2 text-white rounded hover:bg-blue-700"
                onClick={(handleStartInterviewClick)}
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>
        <ToastContainer
          toastClassName="rounded-full bg-green-500 text-white p-4 text-center"
          bodyClassName="text-white"
          position="top-center"
        />
      </div>
    </div>
  );
};

export default InterviewInstructions;


