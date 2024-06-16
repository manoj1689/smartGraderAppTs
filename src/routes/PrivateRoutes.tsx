import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../services/auth/ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateJobsPage from "../pages/CreateJobsPage";
import EditJobs from "../components/Dashboard/Organization/EditJobs";
import InterviewInstructions from "../pages/InterviewInstructionsPage";
import InterviewEndPage from "../pages/InterviewEndPage";

// @ts-ignore
import InterviewPage from "../pages/InterviewPage";
// @ts-ignore
import GenerateQuestionsPage from "../pages/GenerateQuestionPage";
// @ts-ignore
import ResultPage from "../pages/ResultPage";

// import SelectQuestion from "../components/dashboards/organizationDashBoard/SelectQuestion";



const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="createjobs" element={<CreateJobsPage />} />
        <Route path="editjobs" element={<EditJobs />} />
        <Route path="interviewscreen" element={<InterviewPage />} />
        <Route path="question/:questionSetId" element={<InterviewPage />} /> 
        <Route path="question/:questionSetId/instructions" element={<InterviewInstructions />} />
        <Route path="question/exam-end" element={<InterviewEndPage />} />
        <Route path="generatequestion" element={<GenerateQuestionsPage />} />
        <Route path="result" element={<ResultPage />} />
        {/*  <Route path="result" element={<ResultPage />} />
        <Route path="interviewscreen" element={<InterviewScreen />} />
      
        <Route path="createjobs/selectquestion" element={<SelectQuestion />} />
       */}
       
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;

