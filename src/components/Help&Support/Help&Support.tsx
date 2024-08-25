import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import helpSupportTopics from './helpSupportContent.json'; // Adjust path as necessary
import NotificationBar from '../common/Notification/NotificationBar';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// Define search-related functions and data
const searchList = helpSupportTopics.topics.map(topic => ({
  id: topic.id,
  name: topic.name
}));

const handleOnSearch = (string: string) => {
  // Implement search logic
};

const handleOnSelect = (item: any) => {
  // Implement selection logic
};

const handleOnFocus = () => {
  // Implement focus logic
};

const formatResult = (item: any) => {
  // Format the search result
  return item.name;
};

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [relatedTopics, setRelatedTopics] = useState<any[]>([]);

  useEffect(() => {
    const remainingTopics = helpSupportTopics.topics.slice(6);
    const shuffledTopics = shuffleArray(remainingTopics).slice(0, 3);
    setRelatedTopics(shuffledTopics);
  }, []);

  return (
    <div className="w-full px-4 mx-auto">
      <NotificationBar />
      <div className="my-6">
        <div className="text-2xl font-bold bg-slate-200 text-slate-800 p-4 rounded-md">
          How can we help you?
        </div>
        <div className="my-4">
          <div className="w-full lg:w-10/12 mx-auto">
            <ReactSearchAutocomplete
              items={searchList}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
              styling={{
                border: '1.5px solid #C0C0C0',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
        </div>
      </div>
      <div className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {helpSupportTopics.topics.slice(0, 6).map(topic => (
          <div
            key={topic.id}
            onClick={() => navigate(`/dashboard/help&support/${topic.id}`)}
            className="bg-sky-100 text-white p-4 rounded-lg hover:bg-sky-200 transition duration-300 cursor-pointer"
          >
            <div className='flex justify-center h-24'>
              <img src={topic.image_url} alt="img" width={100} height={100}  />
            </div>
            <div>
              <div className='text-xl font-bold text-slate-800 my-3'>
                {topic.name}
              </div>
              <div className='text-lg font-light text-slate-500 my-3'>
                {topic.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-2xl font-bold bg-slate-200 my-5 text-slate-800 p-4 rounded-md">
        Related Topics
      </div>
      <div className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTopics.map(topic => (
          <div
            key={topic.id}
            onClick={() => navigate(`/dashboard/help&support/${topic.id}`)}
            className="bg-sky-100 text-white p-4 rounded-lg hover:bg-sky-200 transition duration-300"
          >
            <div className='flex justify-center h-24'>
              <img src={topic.image_url} alt="img" width={100} height={100}  />
            </div>
            <div>
              <div className='text-xl font-bold text-slate-800 my-3'>
                {topic.name}
              </div>
              <div className='text-lg font-light text-slate-500 my-3'>
                {topic.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupport;



