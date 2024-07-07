// serviceCreateJob.ts
import { useState } from 'react';
interface Option {
  value: string;
  label: string;
}

export const CreateJobService = (selectedId:any,emailList:String[],experience:Option | null) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [jobData, setJobData] = useState({ title: '',emailList:''  });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(event.target.value);
  };



  const getJobInitial = (title: string) => {
    return title ? title.charAt(0) : '';
  };

  const handleSaveAndPublish = () => {
    const jobDetails = {
      ...jobData,
      startDate,
      experience,
      endDate,
      emailList,
      selectedId
    };
    console.log('Job Details:', jobDetails);
    // You can send this jobDetails to your backend here
  };

  const handleDelete = () => {
    setJobData({ title: '',emailList:'' });
    setStartDate(new Date());
    setEndDate(new Date());
    setEmails([]);
    setCurrentEmail('');
  };

  return {
    emails,
    currentEmail,
    jobData,
    startDate,
    endDate,
    setJobData,
    setStartDate,
    setEndDate,
    handleInputChange,
    getJobInitial,
    handleSaveAndPublish,
    handleDelete,
  };
};
