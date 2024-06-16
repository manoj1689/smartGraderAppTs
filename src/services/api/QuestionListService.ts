// handleQuestion.ts
import { Question } from "../../types/interfaces/interface";
import { API_BASE_URL } from "../../constants/Constants";
  export const fetchQuestions = async (id: string): Promise<Question[]> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error('No access token found');
    }
  
    const response = await fetch(`${API_BASE_URL}/questions/all?set_id=${id}`, {
      headers: {
        Accept: 'application/json',
        Token: token,
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data.data;
  };
  