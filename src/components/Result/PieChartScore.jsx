import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const ScorePieChart = ({ score }) => {
  const remaining = 5 - score;

  let scoreColor;
  if (score >= 1 && score <= 2) {
    scoreColor = '#87CEEB';
  } else if (score >= 3 && score <= 4) {
    scoreColor = '#6495ED';
  } else {
    scoreColor = '#0047AB'; // Strong score color
  }

  const data = [
    { title: 'Score', value: score, color: scoreColor },
    { title: 'Remaining', value: remaining, color: '#008080' },
  ];

  return (
    <PieChart
      data={data}
      lineWidth={30}
      radius={30}
      // Add other props if needed
    />
  );
};

export default ScorePieChart;
