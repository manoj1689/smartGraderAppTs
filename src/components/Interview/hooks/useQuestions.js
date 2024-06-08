import { useState, useEffect } from 'react';
import axiosInstance from "../../../services/api/axiosInstance";

export const useQuestions = (setId) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/questions/all?set_id=${1}`);
                // const response = await axiosInstance.get(`/questions/all?set_id=${setId}`);

                setQuestions(response.data.data); // Adjust based on your API response structure
                setError(null);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError('Error fetching questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [setId]);

    return { questions, loading, error };
};
