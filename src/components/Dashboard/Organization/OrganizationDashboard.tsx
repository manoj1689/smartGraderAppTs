import React from "react";

import NotificationBar from "../../common/Notification/NotificationBar";
import CurrentJobs from "./CurrentJob";
import CandidateResults from "./CandidateResult";
import { OrganizationDashboardProps } from "../../../types/interfaces/interface";
import CandidateInvitation from "./CandidateInvitation";
import CandidateStatus from "./CandidateStatus";
import MySets from "./Mysets";
const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({ organizationData }) => {

  return (
    <div className="container lg:w-5/6 mx-auto w-full h-full ">
      <NotificationBar />
      <CurrentJobs /> 
      <MySets/>
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













