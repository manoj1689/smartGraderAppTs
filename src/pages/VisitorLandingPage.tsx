import React from "react";
// @ts-ignore
import Visitor_landing from "../components/Visitor/Visitor_landing"
import { useLocation } from "react-router-dom";
import { getEmail } from "../utils/tokenUtils";
const VisitorLandingPage:React.FC=() => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEmail = queryParams.get("email") || "";
  const userEmail = getEmail();
  console.log(getEmail())
  if (queryEmail === userEmail) {
    return  <Visitor_landing />;
  }
};

export default VisitorLandingPage;
