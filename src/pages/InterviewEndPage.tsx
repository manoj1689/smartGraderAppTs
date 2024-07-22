import React from 'react';
import {  useNavigate } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";
import SmartGrader from "../assets/logos/smartGrader.png";
import ExamEnd from "../assets/images/ExamEnd/examEnd.png"

const InterviewEndPage = () => {
  const navigate = useNavigate();

  return (
    <>
       <div className="flex items-center justify-between border-b border-slate-200">
        <div className='w-auto p-4 '>
          <img src={SmartGrader} alt="Smart Grader" width={140} />
        </div>
      </div>
        <div className="container  mx-auto w-full h-full">
       <NotificationBar/> 
      <div className="flex flex-col items-center justify-center mx-4 bg-white rounded-md border border-solid my-5 pt-10 border-black border-opacity-10 ">
       <img src={ExamEnd} alt="Exam End" className='white' />
        <div className="space-y-8 w-5/6  bg-white p-8 ">

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-extrabold  text-slate-700">Thank you for taking the exams!</h2>
          </div>

          <div className="space-y-2 text-center">
            <div className="space-y-2  text-lg leading-5 text-neutral-500 font-spline">
              <p>We have recieved your answers.</p>
              <p>Your results will be publihed soon and sent to your email.</p>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-blue-400 text-white rounded hover:bg-slate-800"
              onClick={() => navigate(`/dashboard`)}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
    
    </>

  );
};

export default InterviewEndPage;
