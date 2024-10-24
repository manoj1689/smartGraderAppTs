import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../services/auth/ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateJobsPage from "../pages/CreateJobsPage";
import InterviewInstructions from "../pages/InterviewInstructionsPage";
import InterviewEndPage from "../pages/InterviewEndPage";

// @ts-ignore
import InterviewPage from "../pages/InterviewPage";
// @ts-ignore
import GenerateQuestionsPage from "../pages/GenerateQuestionPage";
// @ts-ignore
import ResultPage from "../pages/ResultPage";
import SettingPage from "../pages/SettingPage";
import HelpSupportPage from "../pages/Help&SupportPage";
import MockInterViewPage from "../pages/MockInterviewPage";
import ProgressTrackerPage from "../pages/ProgressTrackerPage";
import QuickAccessPage from "../pages/QuickAccessPage"
import SelectSetPage from "../pages/SelectSetPage";
import EditSettingsPage from "../pages/EditSettingsPage";
import CandidateInvitationPage from "../pages/CandidateInvitationPage";
import CandidateResultPage from "../pages/CandidateResultPage";
import CreateSetPage from "../pages/CreateSetPage";
import ViewJobs from "../components/Dashboard/Organization/ViewJobs";
import HelpSupportTopic from "../components/Help&Support/HelpSupportTopic";
//@ts-ignore
import Visitorhome from "../components/Visitor/visitor_home"
//@ts-ignore
import CodingSection from "../components/codeCompiler/CodeInterview.jsx";
// import SelectQuestion from "../components/dashboards/organizationDashBoard/SelectQuestion";



const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="createjobs" element={<CreateJobsPage />} />
        <Route path="viewjobs" element={<ViewJobs />} />
        {/* <Route path="interviewscreen" element={<InterviewPage />} /> */}
        {/* <Route path="question/:questionSetId" element={<InterviewPage />} />  */}
        <Route path="question/:questionSetId" element={<ProtectedRoute />}>
          <Route index element={<InterviewPage />} />
        </Route>
        <Route path="codingSet/:questionSetId" element={<ProtectedRoute />}>
          <Route index element={<CodingSection />} />
        </Route>
        <Route path="question/:questionSetId/instructions" element={<InterviewInstructions />} />
        <Route path="question/codingsection/:questionSetId" element={<CodingSection/>} /> 
        <Route path="question/exam-end" element={<InterviewEndPage />} />
        <Route path="createset" element={<CreateSetPage />} />
        <Route path="generatequestion" element={<GenerateQuestionsPage />} />
        <Route path="result" element={<ResultPage />} />

        
        <Route path="settings" element={<SettingPage />} /> 
        {/* <Route path="settings" element={<CodingSection/>} />  */}
        <Route path="editsettings" element={<EditSettingsPage />} /> 
        <Route path="help&support" element={<HelpSupportPage />} /> 
        <Route path="/help&support/:id" element={<HelpSupportTopic />} />
        <Route path="mockinterview" element={<MockInterViewPage />} /> 
        <Route path="progresstracker" element={<ProgressTrackerPage />} /> 
        <Route path="quickaccess" element={<QuickAccessPage />} /> 

        <Route path="createjobs/selectset" element={<SelectSetPage />} />
        <Route path="candidateresult" element={<CandidateResultPage/>} /> 
        <Route path="candidateinvitation" element={<CandidateInvitationPage />} /> 
        <Route path="job/guesthome" element={<Visitorhome />} />
        {/*  <Route path="result" element={<ResultPage />} />
        <Route path="interviewscreen" element={<InterviewScreen />} />
      
        <Route path="createjobs/selectquestion" element={<SelectQuestion />} />
       */}
       
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;

