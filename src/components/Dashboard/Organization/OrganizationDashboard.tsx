import React from "react";

import NotificationBar from "../../common/Notification/NotificationBar";
import CurrentJobs from "./CurrentJob";
import { OrganizationDashboardProps } from "../../../types/interfaces/interface";
const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({ organizationData }) => {

  return (
    <div className="container mx-auto w-full h-full px-4 md:px-10">
      <NotificationBar />
      <CurrentJobs /> 
   
    </div>
  );
};

export default OrganizationDashboard;













