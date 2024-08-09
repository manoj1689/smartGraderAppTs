import axiosInstance from "../axios/axiosInstance";
import { ENDPOINTS } from "../../constants/Endpoints";
import axios from 'axios';

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

export const submitAnswer = async (questionId: string, examId: string, duration: string, answer: string) => {
  try {
   console.log(`Question Id ${questionId} and examId ${examId} and Answer Of question ${answer}`)
   const token = localStorage.getItem("accessToken");
    const response = await axiosInstance.post(`${ENDPOINTS.SUBMIT_ANSWER}?question_id=${questionId}&exam_id=${examId}&duration=${duration}&answer=${answer}`, {}, {
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
    console.log("The response after submit Answer",response.data)
    return response.data;
    
  } catch (error) {
    throw new Error('Error evaluating the answer.');
  }
};



export const examStart = async (setId: number, token: string) => {
  try {
    const response = await axiosInstance.post(`${ENDPOINTS.EXAM_START}?set_id=${setId}`, {}, {
      headers: {
        Accept: "application/json",
        Token: token,
      }
    });
    console.log("response of exam start at interview page",response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error ending exams.');
  }
};

export const examEnd = async (examId: string, token: string) => {
  console.log("The exam id Submit Before Post Request",examId)
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


const POINTS = {
  MEDIA_UPLOAD: 'https://api.smartgrader.in/media/upload',
};

export const uploadScreenshot = async (examId: string, token: string, file: File) => {
  try {
    // const formData = new FormData();
    // formData.append('file', file);

    const response = await axios.post(`${POINTS.MEDIA_UPLOAD}?exam_id=${examId}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Token': token,
      },
    
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw new Error('Error uploading media.');
  }
};