import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../../services/api/QuestionListService';

interface Question {
  id: string;
  title: string;
  description: string;
  text: string;
  duration: number;
}

interface QuestionPageProps {
  cardId: string;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ cardId }) => {
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await fetchQuestions(cardId);
        setQuestionsData(questions);
        console.log(questions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [cardId]);

  return (
    <div className="overflow-y-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Questions for Set ID: {cardId}</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {questionsData.map((question) => (
            <li key={question.id} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2 "><span className='mx-1'>Question: </span>{question.title} </h3>
              <h5 className="text-md font-medium mb-2 " ><span className='mx-1'>Description:</span> {question.description}</h5>
              {/* <p className="text-gray-600 mb-4">{question.text}</p>
              <p className="text-gray-600">Duration: {question.duration / 6} sec</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionPage;

