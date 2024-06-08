import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupRequest } from '../../types/interfaces/interface';
import { API_BASE_URL } from "../../constants/Constants";

export const SignUpService = (setFormData: React.Dispatch<React.SetStateAction<SignupRequest>>) => {
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: SignupRequest,
    activeTab: any
  ) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(formData as any);
      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/users/signup?${queryString}`;

      console.log("Constructed URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("A verification email has been sent. Please check your inbox and confirm it!");
        navigate('/signIn', { state: { activeTab } });
      } else {
        alert("Account creation failed!");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("An error occurred while creating the account.");
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



