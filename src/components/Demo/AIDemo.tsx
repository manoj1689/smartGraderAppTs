import React, { useEffect, useState } from 'react';

// Define the type for each interview item
interface InterviewItem {
  id: number;
  question: string;
  answer: string;
  video_url: string;
}

// Define the type for the API response
interface ApiResponse {
  interview: InterviewItem[];
}

function AIDemo() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponse) => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Interview Questions</h1>
      {data.interview.map((item) => (
        <div key={item.id} className="mb-6 p-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">{item.question}</h2>
          <p className="text-lg mb-4">{item.answer}</p>
          <video src={item.video_url} controls className="w-full h-auto rounded-lg"></video>
        </div>
      ))}
    </div>
  );
}

export default AIDemo;



