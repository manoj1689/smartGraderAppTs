import { useState } from 'react';
import { addJob ,JobInvites } from '../api/JobService';
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
interface Option {
value: string;
label: string;
}

export const CreateJobService = (selectedId: any, emailList: string[], experience: Option | null,startDate:Date,endDate:Date) => {
const navigate=useNavigate()
const [emails, setEmails] = useState<string[]>([]);
const [currentEmail, setCurrentEmail] = useState<string>('');
const [title, setTitle] = useState<string>('');
const [description, setDescription] = useState<string>('');

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = event.target;

// Update state based on the input name
if (name === 'currentEmail') {
setCurrentEmail(value);
} else if (name === 'title') {
setTitle(value);
} else if (name === 'description') {
setDescription(value);
}
};
const handleSaveAndPublish = async () => {
    try {
      if (startDate && endDate) {
        // Prepare job details
        const jobDetails = {
          title,
          description,
          experience: experience?.label,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: 1,
          set_id: selectedId // Adjust set_id as per your requirement
        };
  
        console.log('Job Details:', jobDetails, "emailList", emailList);
  
        // Call addJob and await the response
        const response = await addJob(jobDetails, navigate, toast);
  
        // Check if the job was successfully published
        if (response?.job_id) {
          console.log("Job published with ID:", response.job_id);
  
          // Send job invites
          const inviteResponse = await JobInvites(emailList, response.job_id, toast);
  
          console.log("Job invitation response:", inviteResponse);
  
          // If job invites were successful, navigate to the homepage
          toast.success("Job published and invites sent successfully!");
          //navigate("/");
  
        } else {
          toast.error("Failed to publish the job. Please try again.");
        }
      } else {
        toast.error('Please select both start and end dates.');
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while submitting your data.");
    }
  };
  
const handleDelete = () => {
setTitle('');
setDescription('');
setEmails([]);
setCurrentEmail('');
// setExperience({ value: "", label: "" }); // You might not need to reset experience here
};

return {
emails,
currentEmail,
title,
description,
// experience,
setTitle,
setDescription,
// setExperience,
handleInputChange,
handleSaveAndPublish,
handleDelete,
};
};
