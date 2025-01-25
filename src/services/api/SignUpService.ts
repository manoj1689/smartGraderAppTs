import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupRequest } from '../../types/interfaces/interface';
import { API_BASE_URL } from "../../constants/Constants";
import { toast } from "react-toastify";

export const SignUpService = (
  setFormData: React.Dispatch<React.SetStateAction<SignupRequest>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();
      console.log("Response body on signUp:", responseBody);

      if (responseBody === "User Already exist") {
        console.log("User already exists");
        toast.error("User already exists! Please try signing in.");
        return;
      }

      if (response.ok) {
        // Start the loader only for verification
        setLoading(true);

        toast.warn(
          "A verification email has been sent. Please check your inbox and confirm it!",
          {
            onClose: () => {
              // Stop the loader and navigate after the toast disappears
              setLoading(false);
              navigate('/signIn', { state: { activeTab } });
            },
            theme: "dark",
          }
        );
      } else {
        if (responseBody === "User Already exist") {
          console.log("User already exists");
          toast.error("User already exists! Please try signing in.");
        } else {
          toast.error(
            "Account creation failed! " + (responseBody.message || "")
          );
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("An error occurred while creating the account.");
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
    handleChange,
  };
};



