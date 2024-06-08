import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import PasswordPage from "../pages/PasswordPage";
import SelectInterestPage from "../pages/SelectInterestPage";
import { getToken } from "../utils/tokenUtils";
const PublicRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/"   element={
          getToken() ?  <CreateAccountPage /> : <SignInPage /> 
        } />
         <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
   
        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/signIn/password" element={<PasswordPage />} />
     
            <Route path="/signUp/selectInterest" element={<SelectInterestPage />} />
        
          {/*  <Route path="/evaluate" element={<EvaluateStudentAnswer />} /> */}
      </Routes>
    </>
    
   
  );
};

export default PublicRoutes;
