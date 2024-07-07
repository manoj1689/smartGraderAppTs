import React, { useState, useEffect } from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { FaArrowsDownToPeople } from "react-icons/fa6";
interface Props {
    emails: string[];
    setEmails: React.Dispatch<React.SetStateAction<string[]>>;
  }

  const AddEmails: React.FC<Props> = ({ emails, setEmails }) => {
   // const [emails, setEmails] = useState<string[]>([]);
  const [savedEmails, setSavedEmails] = useState<string[]>([]);

  useEffect(() => {
    const storedEmails = localStorage.getItem('emailsList');
    if (storedEmails) {
      setSavedEmails(JSON.parse(storedEmails));
    }
  }, []);
 console.log("the entered emails are" ,emails)
  const handleSaveInvite = () => {
    if (emails.length === 0) {
      alert('Please enter at least one email.');
      return;
    }

    const uniqueEmails = emails.filter(email => !savedEmails.includes(email));
    const updatedEmails = [...savedEmails, ...uniqueEmails];
    setSavedEmails(updatedEmails);
    localStorage.setItem('emailsList', JSON.stringify(updatedEmails));
    setEmails([]); // Clear the email input field after saving
  };

  const handleAddToInput = (email: string) => {
    if (!emails.includes(email)) {
      setEmails(prevEmails => [...prevEmails, email]);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className='flex justify-center my-4'>
        <FaArrowsDownToPeople size={80} className='text-blue-400' />
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Send Invitation</h2>
      <p className="text-center text-gray-600 mb-4">
        You haven’t added any candidates for the interview yet. As the owner of
        this project, you can send invitations for interviews with AI.
      </p>
      <div className='flex flex-col lg:flex-row items-center gap-3'>
        <ReactMultiEmail
          emails={emails}
          onChange={(_emails: string[]) => setEmails(_emails)}
          validateEmail={email => isEmail(email)}
          getLabel={(email: string, index: number, removeEmail: (index: number) => void) => (
            <div data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          )}
          placeholder="Enter an email"
          className="w-10/12 p-2 border rounded"
        />
        <button
          onClick={handleSaveInvite}
          className="bg-blue-500 text-white p-2 my-auto text-nowrap rounded w-full"
        >
          Send Invite
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Previously added Emails</h3>
      <ul>
        {savedEmails.map((email, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <div className="flex items-center">
              <img src={`https://i.pravatar.cc/40?img=${index}`} alt={email} className="rounded-full w-10 h-10 mr-4" />
              <div>
                <div className="font-bold">{email}</div>
                <div className="text-gray-600 text-sm">Role</div>
              </div>
            </div>
            <button
              onClick={() => handleAddToInput(email)}
              className="text-blue-500 font-semibold"
            >
              Invite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEmails;
