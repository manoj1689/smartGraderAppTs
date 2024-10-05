import React from 'react';

const DateFormatPage = ({ start_date }) => {
  const timestamp = start_date;
  const dateInUTC = new Date(timestamp);
//console.log("date at date format page",start_date)
  // Convert to IST (UTC+5:30)
  const istDate = new Date(dateInUTC.getTime() + 5.5 * 60 * 60 * 1000);

  // Format the IST date and time
  const optionsDate = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const optionsTime = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const dateString = istDate.toLocaleDateString('en-IN', optionsDate);
  const timeString = istDate.toLocaleTimeString('en-IN', optionsTime);

  return (
    <div className=" bg-sky-100 gap-2">
    <div className="text-gray-700 font-medium flex gap-2 items-center">
      <span className="material-icons text-gray-500 ">Exam on</span>
      <span>{dateString}</span>
    </div>
    <div className="text-gray-700 font-medium  gap-2 flex items-center">
      <span className="material-icons text-gray-500 ">Time</span>
      <span>{timeString}</span>
    </div>
  </div>
  
  );
};

export default DateFormatPage;

