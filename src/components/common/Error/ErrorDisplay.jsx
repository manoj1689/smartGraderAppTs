import React from 'react';
import BrokenApi from "../../../assets/images/ErrorImage/error_gif.gif";
import { FiRefreshCw } from 'react-icons/fi';

const ErrorPage = ({ message }) => {


 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center ">
        <img src={BrokenApi} alt="Error" className='my-10' />
        <h1 className="text-2xl font-semibold text-gray-800">Oops, that's our bad</h1>
        <p className="text-gray-600 mt-2">
          {message ? message : (
            <>
              We're not exactly sure what happened, but something went wrong.<br/> If you need immediate help, please{' '}
              <a href="mailto:info@smartgrader.in" className="text-blue-500 underline">let us know</a>.
            </>
          )}
        </p>
        <div className=" flex my-4 justify-center">
          <button
            
            className="flex items-center justify-center bg-white border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            <FiRefreshCw className="mr-2" /> Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
