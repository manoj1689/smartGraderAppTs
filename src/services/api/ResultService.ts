import axiosInstance from '../axios/axiosInstance';
import { getToken } from '../../utils/tokenUtils';
import { ENDPOINTS } from "../../constants/Endpoints";


export const fetchSetsResult = async (examId: string) => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(`${ENDPOINTS.EXAM_RESULT}/${examId}`,{
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
   // console.log("Set Result",  JSON.stringify(response.data, null, 2))
    return response.data;
  } catch (error) {
    throw new Error('Error Fetching Set Result.');
  }
};