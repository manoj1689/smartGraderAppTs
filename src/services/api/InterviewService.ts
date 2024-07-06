import axiosInstance from "../axios/axiosInstance";
import { ENDPOINTS } from "../../constants/Endpoints";

export const fetchSetQuestions = async (setId: string, token: string) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINTS.FETCH_QUESTION}?set_id=${setId}`, {
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

export const submitAnswer = async (questionId: string, examId: string, duration: string, answer: string, token: string) => {
  try {
   
    const response = await axiosInstance.post(`${ENDPOINTS.SUBMIT_ANSWER}?question_id=${questionId}&exam_id=${examId}&duration=${duration}&answer=${answer}`, {}, {
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
    return response.data;
    
  } catch (error) {
    throw new Error('Error evaluating the answer.');
  }
};

export const examStart = async (examId: string, token: string) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINTS.EXAM_START}?set_id=${examId}`, {}, {
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error ending exams.');
  }
};

export const examEnd = async (examId: string, token: string) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINTS.EXAM_END}?exam_id=${examId}`, {}, {
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error ending exams.');
  }
};

export const uploadScreenshot = async (examId: string, token: string, file: File) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINTS.MEDIA_UPLOAD}?exam_id=${examId}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: "application/json",
        Token: token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error uploading media.');
  }
};


