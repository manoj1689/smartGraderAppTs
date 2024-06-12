import React from 'react';
import { EducationalDashboardProps } from '../../../types/interfaces/interface';


const EducationalDashBoard: React.FC< EducationalDashboardProps> = ({ educationalData }) => {
  return (
    <div>
      {/* Render educationalData */}
      <pre>{JSON.stringify(educationalData, null, 2)}</pre>
    </div>
  );
};

export default EducationalDashBoard;
