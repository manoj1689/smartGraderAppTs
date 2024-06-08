// serviceCreateJob.ts
import { useState } from 'react';

export const CreateJobService = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [jobData, setJobData] = useState({ title: '', experience: '' });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isValidEmail(currentEmail)) {
        setEmails([...emails, currentEmail]);
        setCurrentEmail('');
      } else {
        alert('Please enter a valid email address.');
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const getJobInitial = (title: string) => {
    return title ? title.charAt(0) : '';
  };

  const handleSaveAndPublish = () => {
    const jobDetails = {
      ...jobData,
      startDate,
      endDate,
      emails,
    };
    console.log('Job Details:', jobDetails);
    // You can send this jobDetails to your backend here
  };

  const handleDelete = () => {
    setJobData({ title: '', experience: '' });
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
    handleKeyPress,
    getJobInitial,
    handleSaveAndPublish,
    handleDelete,
  };
};
