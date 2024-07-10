import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import PasswordPage from "../pages/PasswordPage";
import SelectInterestPage from "../pages/SelectInterestPage";
import VisitorLandingPage from "../pages/VisitorLandingPage";
import { getToken } from "../utils/tokenUtils";
import { getEmail } from "../utils/tokenUtils";

const PublicRoutes: React.FC = () => {
  const userEmail = getEmail();
  const shouldRenderVisitorLanding = userEmail === getEmail();
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

        {/* To run this route run from terminal : 
        cd src
        node server.js  */}
        <Route path="/visitorlanding" element={<VisitorLandingPage />} />

        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/signIn/password" element={<PasswordPage />} />

        <Route path="/signUp/selectInterest" element={<SelectInterestPage />} />

        {/*  <Route path="/evaluate" element={<EvaluateStudentAnswer />} /> */}
      </Routes>
    </>
  );
};

export default PublicRoutes;
