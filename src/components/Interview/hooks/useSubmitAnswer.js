// src/components/Interview/hooks/useSubmitAnswer.js
import { useState } from 'react';
import axiosInstance from '"../../../services/api/axiosInstance"; // adjust the import path as needed

export const useSubmitAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const submitAnswer = async (question, answer, knowledgeLevel) => {
    setLoading(true);
    setProgress(30);
    try {
      const response = await axiosInstance.post('/evaluate_student_answer', {
        question,
        user_answer: answer,
        knowledge_level: knowledgeLevel,
      });
      setProgress(100);
      setError(null);
      return response.data;
    } catch (err) {
      setError('An error occurred while evaluating the answer.');
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return { submitAnswer, loading, progress, error };
};
