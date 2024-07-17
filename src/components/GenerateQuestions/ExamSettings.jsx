import React from 'react';

const ExamSettings = ({ examTiming, setExamTiming,generatedQuestions }) => (
  <div className="mb-4 mt-5 px-4 py-4">
  <div className="flex text-slate-800 flex-col lg:flex-row gap-3 justify-between  text-md font-spline font-bold mb-2">
  <label>No of Questions: {generatedQuestions.length}</label> 
  <label>Total Exam Duration: {examTiming} minutes (2 minutes per question)</label>
</div>
<div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
    {/* <input
      type="number"
      value={examTiming}
      onChange={(e) => setExamTiming(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
    /> */}
  </div>
);

export default ExamSettings;
