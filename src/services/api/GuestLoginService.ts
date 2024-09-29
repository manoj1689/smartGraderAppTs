import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom"; // Import NavigateFunction type
import {  setToken, setLogged, setEmail } from '../../utils/tokenUtils';
import { API_BASE_URL } from "../../constants/Constants";
import { LoginResponse } from "../../types/interfaces/interface";

// Pass navigate as a parameter with type NavigateFunction
export const GuestLogin = async (email: string, navigate: NavigateFunction, password: any, jobId: number) => {
  try {
    const url = `${API_BASE_URL}/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "",
        username: email,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    });

    if (response.ok) {
      const responseData: LoginResponse = await response.json();
      console.log("ResponseData", responseData);
      const { status, msg, email, access_token, is_onboard, is_verified } = responseData;

      if (status === 1) {
        // Set necessary tokens and navigate based on user verification
        setToken(access_token);
        setEmail(email);
        setLogged(true);

        if (is_verified === 1 && is_onboard === 1) {
          navigate("/dashboard/job/guesthome", { state: { jobId: jobId } });
        } else if (is_verified === 1 && is_onboard === 0) {
          navigate("/signUp");
        }
      } else {
        toast.error(msg || "Login failed. Please try again.");
      }
    } else {
      // Handle non-OK responses
      const errorMessage = await response.json();
      
      switch (response.status) {
        case 400:
          toast.error('Invalid request. Please check the input and try again.');
          break;
        case 401:
          toast.error('Unauthorized. Please check your password or credentials.');
          break;
        case 403:
          toast.error('Access forbidden. You do not have permission to access this resource.');
          break;
        case 404:
          toast.error('Resource not found. Please check the details and try again.');
          break;
        case 422:
          toast.error('Validation error. Please provide correct details.');
          break;
        default:
          toast.error(errorMessage.msg || 'An unexpected error occurred. Please try again later.');
          break;
      }
    }
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error("An error occurred while signing in. Please try again later.");
  }
};
