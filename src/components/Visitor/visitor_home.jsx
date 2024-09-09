import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Visitor_dummy from "./Visitor_dummy";
import Subscribe from "../Visitor/Subscribe";
import Footer from "../Visitor/Footer";
import Visitor_header from "./Visitor_header";
import Testimonials from "../Visitor/Testimonials";
import { fetchJobDetails } from "../../services/api/JobService"; // assuming this is the correct import

const VisitorHome = () => {
  const location = useLocation();
  const [jobDetails, setJobDetails] = useState(null);

  // Log jobId if available
  const jobId = location.state?.jobId;
  console.log("Job ID:", jobId);

  useEffect(() => {
    const fetchJobData = async () => {
      if (jobId) {
        try {
          const JobDetailResponse = await fetchJobDetails(jobId);
          console.log("Job Details:", JobDetailResponse);
          setJobDetails(JobDetailResponse);
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      }
    };

    fetchJobData();
  }, [jobId]);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        <div className="container mx-auto flex-grow">
          <Visitor_header />
          <Visitor_dummy jobDetails={jobDetails} /> {/* Pass job details to child component */}
          <Testimonials />
          <Subscribe />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default VisitorHome;

