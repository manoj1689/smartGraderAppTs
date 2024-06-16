import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../services/auth/ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateJobsPage from "../pages/CreateJobsPage";
import EditJobs from "../components/Dashboard/Organization/EditJobs";
// @ts-ignore
import InterviewPage from "../pages/InterviewPage";
// @ts-ignore
import GenerateQuestionsPage from "../pages/GenerateQuestionPage";
// @ts-ignore
import ResultPage from "../pages/ResultPage";
import SettingPage from "../pages/SettingPage";
import HelpSupportPage from "../pages/Help&SupportPage";
import MockInterViewPage from "../pages/MockInterviewPage";
import SelectQuestionPage from "../pages/SelectQuesionPage";
import EditSettingsPage from "../pages/EditSettingsPage";
import CandidateInvitationPage from "../pages/CandidateInvitationPage";
import CandidateResultPage from "../pages/CandidateResultPage";
// import SelectQuestion from "../components/dashboards/organizationDashBoard/SelectQuestion";



const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="createjobs" element={<CreateJobsPage />} />
        <Route path="editjobs" element={<EditJobs />} />
        <Route path="interviewscreen" element={<InterviewPage />} />
        <Route path="question/:id" element={<InterviewPage />} /> 
        <Route path="generatequestion" element={<GenerateQuestionsPage />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="settings" element={<SettingPage />} /> 
        <Route path="editsettings" element={<EditSettingsPage />} /> 
        <Route path="help&support" element={<HelpSupportPage />} /> 
        <Route path="mockinterview" element={<MockInterViewPage />} /> 
        <Route path="createjobs/selectquestion" element={<SelectQuestionPage />} />
        <Route path="candidateresult" element={<CandidateResultPage/>} /> 
        <Route path="candidateinvitation" element={<CandidateInvitationPage />} /> 

        {/*  <Route path="result" element={<ResultPage />} />
        <Route path="interviewscreen" element={<InterviewScreen />} />
      
        <Route path="createjobs/selectquestion" element={<SelectQuestion />} />
       */}
       
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;

