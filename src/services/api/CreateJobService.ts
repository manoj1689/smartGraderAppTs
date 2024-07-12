import { useState } from 'react';
import { addJob } from '../api/JobService';
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
interface Option {
  value: string;
  label: string;
}

export const CreateJobService = (selectedId: any, emailList: string[], experience: Option | null,) => {
  const navigate=useNavigate()
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null); // Updated to allow null
  const [endDate, setEndDate] = useState<Date | null>(null); // Updated to allow null
  //const [experience, setExperience] = useState<Option | null>({ value: "", label: "" });

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
        const jobDetails = {
          title,
          description,
          experience: experience?.label,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: 1,
          set_id: selectedId // Adjust set_id as per your requirement
        };

        console.log('Job Details:', jobDetails,"emailList",emailList);

        const response = await addJob(jobDetails,navigate,toast); // Call addJob and await the response
        console.log("Job published Sucessfully")

      } else {
        console.error('Please select start and end dates.');
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error as needed, e.g., display toast message
    }
  };

  const handleDelete = () => {
    setTitle('');
    setDescription('');
    setStartDate(null); // Reset to null instead of new Date()
    setEndDate(null); // Reset to null instead of new Date()
    setEmails([]);
    setCurrentEmail('');
    // setExperience({ value: "", label: "" }); // You might not need to reset experience here
  };

  return {
    emails,
    currentEmail,
    title,
    description,
    startDate,
    endDate,
    // experience,
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    // setExperience,
    handleInputChange,
    handleSaveAndPublish,
    handleDelete,
  };
};
