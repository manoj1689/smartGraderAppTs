import React from 'react';
import {  useNavigate } from "react-router-dom";
import NotificationBar from "../components/common/Notification/NotificationBar";

const InterviewEndPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container lg:w-5/6 mx-auto w-full h-full">
       <NotificationBar/> 
      <div className="flex items-center justify-center  rounded-md border border-solid my-5 py-10 border-black border-opacity-10 ">

        <div className="space-y-8 w-5/6 bg-white p-8 ">

          <div className="space-y-2 text-center">
            <h2 className="text-lg font-bold text-slate-800">Thank you for taking the exams!</h2>
          </div>

          <div className="space-y-2 text-center">
            <div className="space-y-2 text-base leading-5 text-neutral-500 font-spline">
              <p>We have recieved your answers. Your results will be publihed soon and sent to your email.</p>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate(`/dashboard`)}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewEndPage;
