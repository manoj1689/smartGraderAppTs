import React from 'react';
import {  useNavigate, useLocation } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import {formattedCurrentDate} from '../utils/formatDate';
import BrowserInstructions from '../components/Interview/BrowserInstructions';

const InterviewInstructions:React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { interview } = location.state || {};

  const handleStartInterviewClick = () => {
    navigate(`/dashboard/question/${interview?.id}`);
  };

  // const { interviewId } = location.state || {};
  // console.log(interviewId?interviewId:)
  // const handleStartInterviewClick = () => {
  //   navigate(`/dashboard/question/${interviewId}`);
  // };
  return (
    <div className="container lg:w-5/6 mx-auto w-full h-full">
       <NotificationBar/> 
      <div className="flex items-center justify-center min-h-screen rounded-md border border-solid my-5 py-10 border-black border-opacity-10 ">

        <div className="space-y-8 w-5/6 bg-white p-8 ">
          <h1 className="text-2xl font-bold text-center text-slate-800">Interview Instructions. (Please read carefully)</h1>

          <div className="space-y-2  ">
            <h2 className="text-lg font-bold text-slate-800">Interview Details</h2>
            <p className="text-base text-neutral-600"><strong>Name:</strong> {interview?.title || '-'}</p>
            <p className="text-base text-neutral-600"><strong>Date:</strong> {formattedCurrentDate}</p>
            <p className="text-base text-neutral-600"><strong>Duration:</strong> {interview?.duration} mins</p>
            <p className="text-base text-neutral-600"><strong>Description:</strong> {interview?.description}</p>
          </div>

          <div className="space-y-2  ">
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

          <div className="">
          <div className="mt-4">
                <BrowserInstructions />
              </div>
          </div>

        

          <div className="flex justify-center mt-4 space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate(`/dashboard`)}
            >
              Go back
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-blue-600"
              onClick={(handleStartInterviewClick)}
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewInstructions;
