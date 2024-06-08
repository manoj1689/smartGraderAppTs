import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa6";
import NotificationBar from "../../common/Notification/NotificationBar";
import { MdArrowOutward } from "react-icons/md";

interface Job {
  id: number;
  title: string;
  Experienced: string;
  Respond: number;
  UnResponse: number;
  level: string;
  status: string;
  applicants: number;
  interviews: number;
  Date: string;
}

interface LocationState {
  jobId?: number;
}

const EditJobs: React.FC = () => {
  const location = useLocation<LocationState>();
  const { jobId } = location.state || {};

  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Software Engineer",
      Experienced: "4-5 years",
      Respond: 3,
      UnResponse: 2,
      level: "Mid",
      status: "Open",
      applicants: 20,
      interviews: 5,
      Date: "5/6/2024",
    },
    {
      id: 2,
      title: "Data Analyst",
      Experienced: "1-2 years",
      Respond: 3,
      UnResponse: 2,
      level: "Junior",
      status: "Closed",
      applicants: 15,
      interviews: 3,
      Date: "5/6/2024",
    },
    {
      id: 3,
      title: "Software Engineer 1",
      Experienced: "2-3 years",
      Respond: 3,
      UnResponse: 4,
      level: "Mid",
      status: "Open",
      applicants: 20,
      interviews: 7,
      Date: "5/6/2024",
    },
    {
      id: 4,
      title: "Data Analyst 1",
      Experienced: "4-5 years",
      Respond: 3,
      UnResponse: 2,
      level: "Junior",
      status: "Closed",
      applicants: 15,
      interviews: 3,
      Date: "5/6/2024",
    },
    {
      id: 5,
      title: "Software Engineer 2",
      Experienced: "1-3 years",
      Respond: 3,
      UnResponse: 2,
      level: "Mid",
      status: "Open",
      applicants: 20,
      interviews: 5,
      Date: "5/6/2024",
    },
    {
      id: 6,
      title: "Data Analyst 2",
      Experienced: "0-5 years",
      Respond: 3,
      UnResponse: 2,
      level: "Junior",
      status: "Closed",
      applicants: 15,
      interviews: 3,
      Date: "5/6/2024",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isValidEmail(currentEmail)) {
        setEmails([...emails, currentEmail]);
        setCurrentEmail('');
      } else {
        alert('Please enter a valid email address.');
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    if (jobId) {
      const job = jobs.find((job) => job.id === jobId);
      setSelectedJob(job || null);
    }
  }, [jobId, jobs]);

  if (!selectedJob) {
    return <div>Loading...</div>;
  }

  const { Respond, UnResponse, interviews } = selectedJob;
  const total = Respond + UnResponse;
  const respondPercentage = (Respond / total) * 100;
  const unrespondPercentage = (UnResponse / total) * 100;

  const handleSendInvites = () => {
    const inviteData = {
      jobId: jobId,
      jobData: selectedJob,
      emails: emails,
    };
    console.log('Invite Data:', inviteData);
  };

  return (
    <div className="container flex flex-col mx-auto p-4">
      <NotificationBar />

      <div className="bg-white rounded-md border border-solid border-black border-opacity-10 px-4 py-4">
        <div className="flex items-center gap-5">
          <FaLaptopCode size={40} color="grey" />
          <div className="font-semibold">{selectedJob.title}</div>
        </div>
        <div className="flex flex-col my-5 lg:flex-row">
          <div className="lg:w-2/3 order-2 lg:order-1">
            <div className="flex flex-col my-5 lg:flex-row">
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Experience Required
                </div>
                <div className="mt-2.5 w-full text-lg font-medium leading-6 text-slate-800">
                  {selectedJob.Experienced}
                </div>
              </div>
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Interview Date
                </div>
                <div className="mt-3 w-full text-lg font-medium leading-6 text-slate-800">
                  {selectedJob.Date}
                  <span className="text-xs">
                    (Link automatically expired after 24 Hours)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col my-5 lg:flex-row">
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Job Invites
                </div>
                <div className="mt-3 w-full text-lg font-medium leading-6 text-slate-800">
                  {selectedJob.interviews}
                </div>
              </div>
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Respond
                </div>
                <div className="flex gap-2 mt-2 text-lg font-medium leading-6 text-slate-800">
                  <div className="shrink-0 self-start bg-sky-500 rounded-full h-[11px] w-[11px] my-2" />
                  <div className="flex-auto">{selectedJob.Respond} Candidates</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col my-5 lg:flex-row">
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Unresponse
                </div>
                <div className="flex gap-2 self-start mt-2 text-lg font-medium leading-6 text-slate-800">
                  <div className="shrink-0 self-start bg-orange-600 rounded-full h-[11px] w-[11px]" />
                  <div className="flex-auto">
                    {selectedJob.UnResponse} Candidates
                  </div>
                </div>
                <div className="self-start mt-2.5 text-base font-light leading-4 text-sky-500 underline">
                  Send invites again
                </div>
              </div>
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Status
                </div>
                <div className="mt-3 w-full text-lg font-medium leading-6 text-emerald-600">
                  Active
                </div>
              </div>
            </div>
            <div className="mt-6">Send Job Invites</div>
            <div className="rounded-md border min-h-32 border-gray-500 border-solid p-4">
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {emails.map((email, index) => (
                    <div
                      key={index}
                      className="justify-center px-5 py-2.5 text-xs leading-4 text-sky-500 whitespace-nowrap bg-sky-50 border border-sky-500 w-auto border-solid rounded-[30px]"
                    >
                      {email}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={currentEmail}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter email..."
                  className="mt-4 px-4 py-2 focus:outline-none focus:ring-0 focus:border-transparent w-full"
                />
              </div>
            </div>

            <button
              className="flex justify-center items-center self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full sm:w-2/3 max-md:px-5"
              onClick={handleSendInvites}
            >
              <div className="flex gap-2.5">
                <div className="flex items-center gap-3">
                  <span>Send Invites </span>
                  <span>
                    <MdArrowOutward />
                  </span>
                </div>
              </div>
            </button>
            <button className="flex justify-center items-center mx-auto self-stretch px-4 py-5 my-10 text-red-500 bg-white rounded-md border border-gray-400 w-full sm:w-2/3 max-md:px-5">
              <div className="flex gap-2.5">
                <div>Back</div>
              </div>
            </button>
          </div>
          <div className="lg:w-1/3 order-1 lg:order-2">
            <div className="px-4 py-4">
              <div>
                <div className="relative w-full h-64">
                  <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      className="text-sky-500"
                      stroke="currentColor"
                      strokeWidth="3.8"
                      strokeDasharray={`${respondPercentage}, 100`}
                      fill="none"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    />
                    <circle
                      className="text-orange-600"
                      stroke="currentColor"
                      strokeWidth="3.8"
                      strokeDasharray={`${unrespondPercentage}, 100`}
                      fill="none"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      strokeDashoffset={`-${respondPercentage}`}
                    />
                    <text
                      x="18"
                      y="20.35"
                      className="text-sm fill-current text-slate-800"
                      textAnchor="middle"
                    >
                      {total}
                    </text>
                    <text
                      x="18"
                      y="24"
                      className="text-[3px] fill-current text-slate-800"
                      textAnchor="middle"
                    >
                      Candidates
                    </text>
                  </svg>
                </div>
              </div>
              <div className="flex gap-5 self-center mt-9 text-base font-light leading-6">
                <div className="flex flex-1 gap-2 justify-end px-5">
                  <div className="shrink-0 self-start bg-sky-500 rounded-full h-[11px] w-[11px]" />
                  <div>Respond</div>
                </div>
                <div className="flex flex-1 gap-2 px-5">
                  <div className="shrink-0 self-start bg-orange-600 rounded-full h-[11px] w-[11px]" />
                  <div>Unrespond</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobs;
