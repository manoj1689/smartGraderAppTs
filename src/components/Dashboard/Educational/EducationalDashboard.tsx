import React from 'react';

interface EducationalDashBoardProps {
  educationalData: any; // Replace `any` with a more specific type if available
}

const EducationalDashBoard: React.FC<EducationalDashBoardProps> = ({ educationalData }) => {
  return (
    <div>
      {/* Render educationalData */}
      <pre>{JSON.stringify(educationalData, null, 2)}</pre>
    </div>
  );
};

export default EducationalDashBoard;
