import React from "react";

import NotificationBar from "../../common/Notification/NotificationBar";
import CurrentJobs from "./CurrentJob";
import CandidateResults from "./CandidateResult";
import { OrganizationDashboardProps } from "../../../types/interfaces/interface";
import CandidateInvitation from "./CandidateInvitation";
import CandidateStatus from "./CandidateStatus";
const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({ organizationData }) => {

  return (
    <div className="container mx-auto w-full h-full px-4 md:px-10">
      <NotificationBar />
      <CurrentJobs /> 
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full">
      <CandidateResults/>
      </div>
  <div className="w-full">
  <CandidateInvitation/>
  </div>
   
    </div>
<CandidateStatus/>
    </div>
  );
};

export default OrganizationDashboard;













