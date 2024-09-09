
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/*" element={<PublicRoutes />} /> 
        <Route path="/dashboard/*" element={<PrivateRoutes />} /> 
      
       

         {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
