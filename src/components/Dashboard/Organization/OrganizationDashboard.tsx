import React from "react";

import NotificationBar from "../../common/Notification/NotificationBar";
import CurrentJobs from "./CurrentJob";
import CandidateResults from "./CandidateResult";
import { OrganizationDashboardProps } from "../../../types/interfaces/interface";
import CandidateInvitation from "./CandidateInvitation";
import CandidateStatus from "./CandidateStatus";
import OrganizationSets from "./OrganizationSets";
import MySets from "./Mysets";
const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({
  organizationData,
}) => {
  return (
    <div className="p-4 ">
      <div>
        <NotificationBar />
      </div>
      <OrganizationSets/>
       <CurrentJobs />  
      <MySets/>
      <div className="flex flex-col mx-2 mt-10 gap-5 xl:flex-row">
        <div className="w-full">
          <CandidateResults />
        </div>
        <div className="w-full">
          <CandidateInvitation />
        </div>
      </div>
      <CandidateStatus />
    </div>
  );
};

export default OrganizationDashboard;
