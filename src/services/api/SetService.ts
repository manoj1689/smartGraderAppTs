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
type setId=any;
export const handleSetSubmit = async (
  selectedSets: SetData,
  navigate: (path: string,setId:any) => void,
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

      console.log('Response from API:', response.data.set_id); // Log response from API
           if (response.data.status === 1 && response.data.msg === "success") {
        const setId = response.data.set_id;
        console.log("Set ID from response:", setId); // Log set_id from the response
        console.log("Proceeding with selected sets:", selectedSets);
  
        // Navigate to the dashboard and pass the setId in state
        navigate("/dashboard/generatequestion", { state: { setId } });
      
    return  response.data.set_id;
      } else {
        toast.error('Failed to save selected sets.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while submitting your selection.');
    }
  
};
