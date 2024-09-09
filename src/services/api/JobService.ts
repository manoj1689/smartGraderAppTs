import axiosInstance from "../axios/axiosInstance";
import { getToken } from "../../utils/tokenUtils";
import { API_BASE_URL } from "../../constants/Constants";
import { AddJobData,JobList,JobDetail } from "../../types/interfaces/interface";



export const addJob = async (
    AddJobData: AddJobData,
    navigate: (path: string) => void,
    toast: { error: (msg: string) => void }
  ) => {
    const token = getToken();
  
    // Log editSetData before making the POST request
    console.log("Edit set data before POST:",AddJobData);
  
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/jobs/add`,
        AddJobData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
  
      console.log("Response from x API:", response.data); // Log response from API
      
      
     // console.log("Response from API:", response.data.set_id); // Log response from API
      if (response.data.status === 1 && response.data.msg === "success") {
        // Navigate to the dashboard and pass the setId in state
        // navigate("/dashboard");
  
        return response.data;
      } else {
        toast.error("Failed to save selected sets.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while submitting your selection.");
    }
  };

  export const JobInvites = async (
    Emails: string[], // Array of email addresses
    jobId: number,    // Job ID to be included in the payload
    toast: { success: (msg: string) => void; error: (msg: string) => void }
  ) => {
    const token = getToken(); // Get the token
  
    // Log emails and jobId before making the POST request
    console.log("Email payload before POST:", Emails);
    console.log("Job ID:", jobId);
  
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/jobs/invite`,
        {
          email: Emails,  // Array of email addresses
          job_id: jobId   // Job ID
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
  
      console.log("Response from API:", response.data); // Log response from API
  
      if (response.data.status === 1 && response.data.msg === "success") {
        toast.success("Job invites sent successfully.");
      } else {
        toast.error("Failed to send job invites.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while sending job invites.");
    }
  };

  export const fetchJobList = async (): Promise<JobList[]> => {
    const token = getToken();
    try {
      const response = await axiosInstance.get(
        '/jobs/created',
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log("List of Jobs ",response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my sets:", error);
      return [];
    }
    
  };

  export const fetchJobDetails = async (job_id: number): Promise<JobDetail | null> => {
    const token = getToken();
    try {
      const response = await axiosInstance.get(`/jobs/detail?job_id=${job_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      });
      console.log("Details of Jobs", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my Job Details:", error);
      return null;
    }
  };