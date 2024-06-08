import React from "react";
import { FormData } from "../../../types/interfaces/interface";
import { setRememberedEmail,setRememberedPassword ,removeRememberedEmail,removeRememberedPassword } from "../../../utils/rememberedCredentials";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleCheckboxChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const { checked } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    agreedToTerms: checked,
  }));

  if (checked) {
    setRememberedEmail(formData.email)
    setRememberedPassword(formData.password)
   
  } else {
    removeRememberedEmail();
    removeRememberedPassword();
 
  }
};
