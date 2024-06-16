import { MyFormData } from "../../types/interfaces/interface";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants/Constants";
// handlePassword.ts
export const handleRecoverSubmit = async (formData: MyFormData): Promise<boolean> => {
    try {
        console.log(formData.email);
        const response = await fetch(`${API_BASE_URL}/users/getotp?email=${encodeURIComponent(formData.email)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        const responseData = await response.json();
        // console.log(responseData.success)
        if (responseData.success === true) {
          toast.success("OTP sent successfully");
          return true; // Return true indicating success
        } else {
          toast.error("Failed to send OTP");
          return false; // Return false indicating failure
        }
        
    } catch (error) {
        console.error('An error occurred:', error);  // Log the error for debugging
        toast.error("An error occurred while sending the OTP");
        return false; // Return false indicating failure
    }
};


export const handleOtpSubmit = async (storedEmail: string, enteredOtp: string): Promise<boolean> => {
    try {
        const url = `${API_BASE_URL}/users/verifyotp?email=${storedEmail}&otp=${enteredOtp}`;
        console.log(url)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData.success)
            if (responseData && responseData.success === true) {
                toast.success("OTP verified successfully");
                return true;
            } else {
                toast.error("Invalid OTP");
                return false;
            }
        } else {
            toast.error("An error occurred while verifying OTP");
            return false;
        }
    } catch (error) {
        console.error("An error occurred while verifying OTP:", error);
        toast.error("An error occurred while verifying OTP");
        return false;
    }
};


export const handleResetPassword = async (new_Password:string,confirm_Password:string, storedEmail: string, enteredOtp: string): Promise<boolean> => {
    try {
        const url = `${API_BASE_URL}/users/updatepw?new_password=${new_Password}&confirm_password=${confirm_Password}&email=${storedEmail}&otp=${enteredOtp}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData.success)
            if (responseData && responseData.success === true) {
                toast.success("Password Reset successfully");
                return true;
            } else {
                toast.error("Wrong Password");
                return false;
            }
        } else {
            toast.error("An error occurred while Reset Password");
            return false;
        }
    } catch (error) {
        console.error("An error occurred while Reset Password:", error);
        toast.error("An error occurred while Reset Password");
        return false;
    }
};
