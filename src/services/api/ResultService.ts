import axiosInstance from '../axios/axiosInstance';
import { getToken } from '../../utils/tokenUtils';
import { ENDPOINTS } from "../../constants/Endpoints";



export const fetchExamResult = async (examId: string) => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(`${ENDPOINTS.EXAM_RESULT}/${examId}`,{
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
   console.log("Set List  in fetch Attempt Api",response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error Fetching Set Result.');
  }
};

export const fetchExamScreenshots = async (examId: string) => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(`${ENDPOINTS.EXAM_MEDIA}?exam_id=${examId}`, {
      headers: {
        Accept: "application/json",
        Token: token,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching of Media ScreenShots');
  }
};
