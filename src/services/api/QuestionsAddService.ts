import axiosInstance from "../axios/axiosInstance";
import { getToken } from "../../utils/tokenUtils";
import { API_BASE_URL } from "../../constants/Constants";
import { toast } from "react-toastify";

interface Question {
  q: string;
  desc: string;
  type: number;
  duration: number;
}

interface QuestionPayload {
  set_id: number;
  questions: Question[];
}

export const handleQuestionSubmit = async (
  set_id: number,
  questionList: Question[],
   navigate: (path: string) => void,
  // toast: { error: (msg: string) => void }
) => {
  const token = getToken();

  // Prepare the payload
  const payload: QuestionPayload = {
    set_id,
    questions: questionList
  };

  // Log payload before making the POST request
  console.log('Payload before POST:', payload);

  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/questions/add`, // Update the endpoint as per your API
      payload,
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
      console.log("Proceeding with this Set of question:", questionList);
     // navigate("/dashboard/generatequestion");
    } else {
      toast.error('Failed to save question list.');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    toast.error('An error occurred while submitting your selection.');
  }
};
