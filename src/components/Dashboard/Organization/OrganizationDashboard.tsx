import React from "react";

import NotificationBar from "../../common/Notification/NotificationBar";
 import CurrentJobs from "./CurrentJob";

const OrganizationDashboard: React.FC = () => {

  return (
    <div className="container mx-auto w-full h-full px-4 md:px-10">
      <NotificationBar />
      <CurrentJobs /> 
   
    </div>
  );
};

export default OrganizationDashboard;













