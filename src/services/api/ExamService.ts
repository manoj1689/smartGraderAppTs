import axiosInstance from '../axios/axiosInstance';
import { getToken } from '../../utils/tokenUtils';
import { ENDPOINTS } from "../../constants/Endpoints";


export const examStart = async (setId: number) => {
  const token = getToken();
  try {
    const response = await axiosInstance.post(`${ENDPOINTS.EXAM_START}?set_id=${setId}`,{}, {
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
   
    return response.data;
  } catch (error) {
    throw new Error('Error Fetching Exam Start Details.');
  }
};


export const examEnd = async (setId: number) => {
    const token = getToken();
    try {
      const response = await axiosInstance.post(`${ENDPOINTS.EXAM_END}?exam_id=${setId}`,{},{
        headers: {
          Accept: "application/json",
          Token: token,
        }
      });
     console.log("Exam End Details at service Page",response.data)
      return response.data;
    } catch (error) {
      throw new Error('Error Fetching Exam End Details.');
    }
  };