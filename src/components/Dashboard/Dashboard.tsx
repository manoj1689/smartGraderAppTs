import React from 'react';
import IndividualDashboard from './Individual/IndividualDashboard';
import EducationalDashboard from './Educational/EducationalDashboard';
import OrganizationDashboard from './Organization/OrganizationDashboard';
import { DashboardService } from '../../services/api/DashBoardService';


import { INDIVIDAUL_USER_TYPE,ORGANIZATION_USER_TYPE,EDUCATIONAL_USER_TYPE} from "../../constants/Constants";
const Dashboard: React.FC = () => {
  const { dashboardKey, individualData, organizationData, educationalData } = DashboardService();

  return (
    <div>
      {dashboardKey === INDIVIDAUL_USER_TYPE && <IndividualDashboard individualData={individualData} />}
      {dashboardKey === ORGANIZATION_USER_TYPE && <OrganizationDashboard organizationData={organizationData} />}
      {dashboardKey === EDUCATIONAL_USER_TYPE && <EducationalDashboard educationalData={educationalData} />}
    </div>
  );
};

export default Dashboard;

