import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import PasswordPage from "../pages/PasswordPage";
import SelectInterestPage from "../pages/SelectInterestPage";
import VisitorLandingPage from "../pages/VisitorLandingPage";
import AIDemo from "../components/Demo/AIDemo";
//@ts-ignore
import Visitorhome from "../components/Visitor/visitor_home"
const PublicRoutes: React.FC = () => {

  return (
    <>
      <Routes>
        {/* <Route
          path="/"
          element={
            getToken() ? <SignInPage /> : <CreateAccountPage />
           //  getToken() ?   <Practise/> :<CreateAccountPage />
          }
        /> */}
        <Route path="/" element={<SignInPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/AIDemo" element={<AIDemo />} /> 
        {/* To run this route run from terminal : 
        cd src
        node server.js  */}
        <Route path="/job/*" element={<VisitorLandingPage />} />

         {/* <Route path="job/guesthome" element={<Visitorhome />} /> */}
        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/signIn/password" element={<PasswordPage />} />

        <Route path="/signUp/selectInterest" element={<SelectInterestPage />} />

        {/*  <Route path="/evaluate" element={<EvaluateStudentAnswer />} /> */}
      </Routes>
    </>
  );
};

export default PublicRoutes;
