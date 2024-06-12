import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupRequest } from '../../types/interfaces/interface';
import { API_BASE_URL } from "../../constants/Constants";
import {  toast } from "react-toastify";

export const SignUpService = (setFormData: React.Dispatch<React.SetStateAction<SignupRequest>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: SignupRequest,
    activeTab: any
  ) => {
    e.preventDefault();
    setLoading(true); // Start the spinner
  
    try {
      const queryParams = new URLSearchParams(formData as any);
      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/users/signup?${queryString}`;
  
      console.log("Constructed URL:", url);
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const closeToast = () => {
          navigate('/signIn', { state: { activeTab } });
          setLoading(false); // Stop the spinner after navigation
        };

        toast.warn("A verification email has been sent. Please check your inbox and confirm it!", {
          onClose: closeToast, // Handle close button click
          autoClose:false, // 12 seconds delay
          theme:"dark"
        });
        
      } else {
        toast.error("Account creation failed!");
        setLoading(false); // Stop the spinner if account creation fails
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("An error occurred while creating the account.");
      setLoading(false); // Stop the spinner in case of an error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, activeTab: string) => {
    const { name, value } = e.target;
    let user_type = "";
    if (activeTab === "individual") {
      user_type = "U";
    } else if (activeTab === "organization") {
      user_type = "O";
    } else if (activeTab === "educational") {
      user_type = "I";
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      user_type: user_type,
    }));
  };

  return {
    handleSubmit,
    handleChange
  };
};




