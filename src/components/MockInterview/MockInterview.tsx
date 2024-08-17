import React from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const MockInterview: React.FC = () => {
  return (
    <div className="flex container justify-center py-10 mx-auto">
           Mock Interview Page
    </div>
  );
};

export default MockInterview;


// import React from 'react';
// import { ReactMediaRecorder } from 'react-media-recorder';

// const MockInterview: React.FC = () => {
//   return (
//     <div className="flex container lg:w-5/6 justify-center py-10 mx-auto">
//       <div className="w-full max-w-md p-5 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold mb-5 text-center">Mock Interview</h2>
        
//         <ReactMediaRecorder
//           audio // Enables only audio recording
//           render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
//             <div className="text-center">
//               <p className="mb-4 text-gray-600">Status: {status}</p>

//               <button
//                 onClick={startRecording}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
//               >
//                 Start Recording
//               </button>
              
//               <button
//                 onClick={stopRecording}
//                 className="px-4 py-2 ml-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
//               >
//                 Stop Recording
//               </button>

//               {mediaBlobUrl && (
//                 <div className="mt-6">
//                   <h3 className="text-lg font-semibold">Recorded Audio:</h3>
//                   <audio src={mediaBlobUrl} controls className="w-full mt-2 rounded" />
//                 </div>
//               )}
//             </div>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default MockInterview;