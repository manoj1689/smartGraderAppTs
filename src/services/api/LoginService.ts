import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom"; // Import NavigateFunction type
import { FormData } from "../../types/interfaces/interface";
import { getToken, setToken, removeToken, getEmail, getLogged, setLogged, setEmail, removeEmail, removeLogged, removeEmail } from '../../utils/tokenUtils';
import { getRememberedEmail, setRememberedEmail, removeRememberedEmail, getRememberedPassword, setRememberedPassword, removeRememberedPassword } from '../../utils/rememberedCredentials';
import { API_BASE_URL } from "../../constants/constants";
import { LoginResponse } from "../../types/interfaces/interface";

// Pass navigate as a parameter with type NavigateFunction
export const LoginService = async (formData: FormData, navigate: NavigateFunction, activeTab?: string) => {
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
        username: formData.email,
        password: formData.password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    });

    if (response.ok) {
      const responseData: LoginResponse = await response.json();
      console.log("ResponseData",responseData);
      const { status, msg, email, access_token, is_onboard, is_verified } = responseData;

      if (status === 1) {
        setToken(access_token);
        setEmail(email);
        setLogged(true);
       
        if (is_verified === 1 && is_onboard === 1) {
          if (formData.agreedToTerms) {
            setRememberedEmail(formData.email);
            setRememberedPassword(formData.password)

          } else {
            removeRememberedEmail();
            removeRememberedPassword();

          }
          navigate("/dashboard");
         } else if (is_verified === 1 && is_onboard === 0) {

       navigate("/signUp/selectInterest", { state: { activeTab } });
        }
      } else if (status === 404 && msg === "User Not Found") {
        toast.error("Email ID is incorrect");
      } else if (status === 401 && msg === "Invalid credentials") {
        toast.error("Password is incorrect");
      } else if (status === 401 && msg === "Unverified user") {
        toast.error("Please verify your email by your Gmail account.");
      } else {
        toast.error("Sign-in failed. Please check your credentials.");
      }
    } else {
      toast.error("Sign-in failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error("An error occurred while signing in. Please try again later.");
  }
};
