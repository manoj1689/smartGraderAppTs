import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import NotificationBar from "../../common/Notification/NotificationBar";
import { MdArrowOutward } from "react-icons/md";
import AddEmails from "./AddEmails";
import { JobDetail } from "../../../types/interfaces/interface";
import { fetchJobDetails } from "../../../services/api/JobService";
import { toast, ToastContainer } from "react-toastify";

interface LocationState {
  jobId?: number;
}

const ViewJobs: React.FC = () => {
  const [emailsList, setEmailsList] = useState<string[]>([]);
  const location = useLocation();
  const state = location.state as LocationState;
  const { jobId } = state || {};
  const navigate =useNavigate();
  console.log("The Job Id at edit page", jobId);

  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (jobId) {
        try {
          const jobDetail = await fetchJobDetails(jobId);
          setJobDetail(jobDetail);
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      }
    };

    fetchJobDetail();
  }, [jobId]);

  if (!jobDetail) {
    return <div>Loading...</div>;
  }

  const { title, experience, start_date, end_date,status } = jobDetail;
const Respond=3;
const UnResponse=2
  const total = Respond + UnResponse;
  const respondPercentage = (Respond / total) * 100;
  const unrespondPercentage = (UnResponse / total) * 100;

  const handleSendInvites = () => {
    const inviteData = {
      jobId: jobId,
      emails: emailsList,
    };
    console.log("Job Invites Data:", inviteData);
    if(inviteData.emails.length>0){
      navigate("/dashboard")
    }else{
      toast.error("Enter email-id")
    }
   
  };

  return (
    <div className="container flex flex-col mx-auto p-4">
      <div className="mt-20 lg:mt-10">
        <NotificationBar />
      </div>

      <div className="bg-white rounded-md border border-solid border-black border-opacity-10 px-4 py-4">
        <ToastContainer/>
        <div className="flex items-center gap-5">
          <FaLaptopCode size={40} color="grey" />
          <div className="font-semibold">{title}</div>
        </div>
        <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-col my-5 lg:flex-row">
          <div className="lg:w-2/3 order-2 lg:order-1">
            <div className="flex flex-col my-5 lg:flex-row">
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Experience Required
                </div>
                <div className="mt-2.5 w-full text-lg font-medium leading-6 text-slate-800">
                  {experience}
                </div>
              </div>
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Interview Date
                </div>
                <div className="mt-3 w-full text-lg font-medium leading-6 text-slate-800">
                  <div className="my-3 flex gap-5">
                  <div>
                    {start_date}
                  </div>
                  <div>{end_date}</div>
                  </div>
                 
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
                  5 Candidates
                </div>
              </div>
              <div className="flex flex-col w-full mb-4">
                <div className="w-full text-base font-light leading-6 text-neutral-500">
                  Respond
                </div>
                <div className="flex gap-2 mt-2 text-lg font-medium leading-6 text-slate-800">
                  <div className="shrink-0 self-start bg-sky-500 rounded-full h-[11px] w-[11px] my-2" />
                  <div className="flex-auto">{Respond} Candidates</div>
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
                  <div className="flex-auto">{UnResponse} Candidates</div>
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
                <p> {status === 1 ? "Hiring" : "Closed"}</p>
                </div>
              </div>
            </div>
            <AddEmails emails={emailsList} setEmails={setEmailsList} />
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
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
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

export default ViewJobs;