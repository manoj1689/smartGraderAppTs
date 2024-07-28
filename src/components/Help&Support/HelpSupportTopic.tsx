import { useParams } from 'react-router-dom';
import helpSupportTopics from './helpSupportContent.json'; // Adjust path as necessary
import NotificationBar from '../common/Notification/NotificationBar';
const HelpSupportTopic: React.FC = () => {
  const { id } = useParams<{ id: string }>();
   console.log(id)
  const topic = helpSupportTopics.topics.find(topic => topic.id === id);
 
  if (!topic) {
    return <div className="p-6">Topic not found</div>;
  }

  return (
    <div className="w-full px-4 mx-auto">
      <NotificationBar />
      <div>
        
      </div>
      <h1 className="text-2xl font-bold mb-4">{topic.name}</h1>
      <p className="text-lg">Content for {topic.name} goes here...</p> 
      Add specific content or components related to the topic here 
    </div>
  );
};

export default HelpSupportTopic;
