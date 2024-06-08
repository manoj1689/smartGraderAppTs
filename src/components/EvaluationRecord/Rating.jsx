import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex flex-col items-center mx-4">
        <div className="text-lg font-semibold">{rating.no}</div>
        <div>No</div>
      </div>
      <div className="flex flex-col items-center mx-4">
        <div className="text-lg font-semibold">{rating.yes}</div>
        <div>Yes</div>
      </div>
      <div className="flex flex-col items-center mx-4">
        <div className="text-lg font-semibold">{rating.strong}</div>
        <div>Strong</div>
      </div>
    </div>
  );
};

export default Rating;
