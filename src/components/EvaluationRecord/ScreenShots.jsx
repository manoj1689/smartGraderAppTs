import React from 'react';
const ScreenshotPage = ({screenshotsList}) => {
  // Array of image filenames
  const images = [
    'Screenshot1.png',
    'Screenshot2.png',
    'Screenshot3.png',
    'Screenshot4.png'

    // Add more image filenames as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Screenshots</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshotsList.map((items, index) => (
          
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
           {items.image}
            <img
              src={items.image}
              alt="screenshot"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScreenshotPage;
