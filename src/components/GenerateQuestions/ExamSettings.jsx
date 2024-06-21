import React from 'react';

const ExamSettings = ({ examTiming, setExamTiming }) => (
  <div className="mb-4 mt-5 px-4 py-4">
    <label className="block text-gray-700 text-sm font spline font-bold mb-2 ">Exam Timing (minutes)</label>
    <input
      type="number"
      value={examTiming}
      onChange={(e) => setExamTiming(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);

export default ExamSettings;
