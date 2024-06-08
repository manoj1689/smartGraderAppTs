import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../../services/api/QuestionListService';
import { Question,QuestionPageProps } from '../../../types/interfaces/interface';


const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const { cardId } = props;
  console.log("Question Page Receive id", cardId);

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
    <div className="overflow-y-auto"> {/* Add overflow-y-auto for vertical scrolling */}
      <h1 className="text-2xl font-bold mb-6">Questions for Set ID: {cardId}</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="mx-4 whitespace-nowrap"> {/* Add whitespace-nowrap to prevent line breaks */}
          {questionsData.map((question) => (
            <li key={question.id}> {/* Set a fixed width */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                  <h5 className="text-lg font-semibold mb-2">{question.description}</h5>
                  <p className="text-gray-600 mb-4">{question.text}</p>
                  <p className="text-gray-600">Duration: {question.duration / 6} sec</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionPage;
