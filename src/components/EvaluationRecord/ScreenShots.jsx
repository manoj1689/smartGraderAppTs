import React from 'react';

const ScreenshotPage = ({ screenshotsList }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Screenshots</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshotsList.map((items, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div>Screenshot: {index + 1}</div>
            <a href={items.image} target="_blank" rel="noopener noreferrer">
              <img
                src={items.image}
                alt={`screenshot-${index + 1}`}
                className="w-full h-auto"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScreenshotPage;

