import React from 'react';

const ScoreBar = ({ skill, score, maxScore }) => (
  <div className="mb-8">
    <div className="text-gray-600 mb-2">{skill}</div>
    <div className="flex items-center">
      <div className="flex-1 bg-gray-300 rounded-full h-2 mr-2 overflow-hidden">
        <div
          className={`bg-${score >= 5 ? 'blue' : 'red'}-500 h-full rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${(score / maxScore) * 100}%` }}
        ></div>
      </div>
      <div className="text-gray-600">{score}/{maxScore}</div>
    </div>
  </div>
);

export default ScoreBar;
