import axiosInstance from "../axios/axiosInstance";
import { getToken } from "../../utils/tokenUtils";
import { API_BASE_URL } from "../../constants/Constants";

interface SetData {
  sub_category_id: number;
  title: string;
  description: string;
  set_type: number;
  set_level: number;
}

export const handleSetSubmit = async (
  selectedSets: SetData,
  navigate: (path: string) => void,
  toast: { error: (msg: string) => void }
) => {
    const token = getToken();

    // Log selectedSets before making the POST request
    console.log('Selected sets before POST:', selectedSets);

    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/sets/add`,
        selectedSets,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token
          }
        }
      );

      console.log('Response from API:', response.data); // Log response from API

      if (response.data.status === 1 && response.data.msg === "success") {
        console.log("Proceeding with selected sets:", selectedSets);
       navigate("/dashboard/generatequestion");
    
      } else {
        toast.error('Failed to save selected sets.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while submitting your selection.');
    }
  
};
