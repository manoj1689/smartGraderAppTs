import React,{useState} from 'react';
import {  useNavigate, useLocation } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import {formattedCurrentDate} from '../utils/formatDate';
import BrowserInstructions from '../components/Interview/BrowserInstructions';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InterviewInstructions:React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { interview } = location.state || {};
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleStartInterviewClick = () => {
    if (isChecked) {
      navigate(`/dashboard/question/${interview?.id}`,{
        state: { interview }
      });

    // Request fullscreen for the document element (html)
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
    // Navigate to the interview question page
   
  };

  // const { interviewId } = location.state || {};
  // console.log(interviewId?interviewId:)
  // const handleStartInterviewClick = () => {
  //   navigate(`/dashboard/question/${interviewId}`);
  // };
  return (
    <div className="container lg:w-5/6 mx-auto w-full ">
       <NotificationBar/> 
      <div className="flex  rounded-md border border-solid my-5  border-black border-opacity-10 p-4 ">

        <div className="w-full bg-white p-8  ">
          <h1 className="text-2xl font-bold text-center text-slate-800">Interview Instructions. (Please read carefully)</h1>
        <div className='flex w-full flex-col md:flex-row gap-5 mt-5 '>
        <div className="space-y-2  w-full md:w-1/2   rounded-md border border-solid my-5  border-black border-opacity-10 p-4 ">
            <h2 className="text-lg font-bold text-slate-800">Interview Details</h2>
            <p className="text-base text-neutral-600"><strong>Name:</strong> {interview?.title || '-'}</p>
            <p className="text-base text-neutral-600"><strong>Date:</strong> {formattedCurrentDate}</p>
            <p className="text-base text-neutral-600"><strong>Duration:</strong> {interview?.duration} mins</p>
            <p className="text-base text-neutral-600"><strong>Description:</strong> {interview?.description}</p>
          </div>

          <div className="space-y-2 w-full md:w-1/2 rounded-md border border-solid my-5  border-black border-opacity-10 p-4 ">
            <h4 className="text-lg font-bold text-slate-800">Interview Instructions</h4>
            <div className="space-y-2 text-base leading-5 text-neutral-500 font-spline">
              <p>You will need to put on your camera throughout this interview.</p>
              <p>Ensure your camera and microphone are working. </p>
              <p>Before you start the interview you will need to give browser access to your camera.</p>
              <p>Make sure you are in a quiet environment.</p>
              <p>You can listen to the questions and also record your answers.</p>
              <p>Do not open any other tabs or use any external help.</p>
              <p>Be sure to enter the full screen mode before starting the interview.</p>
              <p>Once you click Next, you cannot fo back to previous page.</p>
              <p>Click the <strong>Start Interview</strong> button to begin.</p>
            </div>
          </div>
        </div>
         

          <div className="rounded-md border border-solid my-5  border-black border-opacity-10 p-4">
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

          <div className="flex w-full my-10 lg:w-5/6 mx-auto justify-center  space-x-4">
            <button
              type="button"
              className="px-6 py-4 lg:w-1/2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => navigate(`/dashboard`)}
            >
              Go back
            </button>
            <button
              type="button"
              className="px-6 py-4 bg-sky-500 lg:w-1/2 text-white rounded hover:bg-blue-600"
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
  );
};

export default InterviewInstructions;

