import axiosInstance from "../axios/axiosInstance";
import { ENDPOINTS } from "../../constants/Endpoints";

class InterviewService {
  async fetchQuestions(setId: string, token: string) {
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
  }

  async submitAnswer(question: string, userAnswer: string, knowledgeLevel: string) {
    try {
      const response = await axiosInstance.post(ENDPOINTS.SUBMIT_ANSWER, {
        question,
        user_answer: userAnswer,
        knowledge_level: knowledgeLevel,
      });
      return response.data;
    } catch (error) {
      throw new Error('Error evaluating the answer.');
    }
  }
}

export default new InterviewService();
