import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);

const LoadingIndicator = ( props ) => {
  // Data for the chart
  const [data, setData] = useState({labels: ['HTML/CSS', 'JavaScript', 'React'], values: [60, 20, 20]});

//    setData({labels : props?.scores?.map(item => item.skill.trim()), values: props?.scores?.map(item => (item.score / item.maxScore) * 100) })
   
  
    
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'My Dataset',
        data: data.values,
        backgroundColor: [
          '#ff6384', // Color for first segment
          '#36a2eb', // Color for second segment
          '#cc65fe', // Color for third segment
          // Add more colors if there are more segments
        ],
        hoverBackgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
        ],
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // Adjust the cutout to create a donut
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <Doughnut data={chartData} options={options} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
      </div>
    </div>
  );
};



export default LoadingIndicator;

// import React from 'react';
// import { FaCircleNotch } from 'react-icons/fa';

// const LoadingIndicator = () => (
//   <div className="flex justify-center mt-8">
//     <FaCircleNotch className="text-blue-500 animate-spin" size={46} />
//   </div>
// );

// export default LoadingIndicator;
