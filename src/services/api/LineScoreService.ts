import axiosInstance from '../axios/axiosInstance';
import { LineScore } from '../../types/interfaces/interface';
import { ROUTES } from '../../constants/Endpoints';

export const fetchexamAttemps = async (token:string): Promise<LineScore[]> => {
  try {
    
    const response = await axiosInstance.get(`${ROUTES.GET_EXAM_ATTEMPTED}`, {
      headers: {
        Accept: "application/json",
        Token: token,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching questions');
  }
};





