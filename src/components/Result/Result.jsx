import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReducedMotion } from "framer-motion";
import EvaluationRecord from "../../components/EvaluationRecord/EvaluationRecord";
import LoadingIndicator from "../../components/EvaluationRecord/LoadingIndicator";
import UserInfo from "../../components/EvaluationRecord/UserInfo";
import MaleEmp from "../../assets/images/GenerateQuestions/male-employee-tick-in-checkbox.png";
import { MESSAGES } from "../../constants/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowUpRight } from "react-icons/fi";
import NotificationBar from "../common/Notification/NotificationBar";
import ErrorPage from "../common/Error/ErrorDisplay";
// @ts-ignore
import fetchResultData from "../../services/api/ResultService";
const Result = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResultData();
        setUser(data);
        console.log(data);
      } catch (error) {
        setError(true);
        toast.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>User Profile</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="container mx-auto w-full flex-col px-4 py-4 justify-center ">
      <NotificationBar />
      <ToastContainer />
      <div className="flex my-5 flex-col rounded-md border border-solid border-black border-opacity-10 lg:flex-row">
        <div className="basis-2/3 flex flex-col md:flex-row  ">
          <div className="flex md:w-1/3 lg:1/5 justify-center items-center ">
            <img
              loading="lazy"
              src={MaleEmp}
              alt="Fail to load image"
              className="px-5 py-5"
            />
          </div>

          <div className="md:w-2/3  lg:4/5 px-4 py-4">
            <div className="my-3 text-2xl font-medium leading-6 text-sky-500">
              {user.name}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex gap-4 mt-5 md:mt-10">
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/689799648e219099fa2906c4eecba4d25378612e478c66530469674a9f3f5960?apiKey=64ac1a7b85e84629af509d56edee2526&"
                      className="aspect-square w-[45px]"
                    />
                    <div className="text-base font-light  text-neutral-500">
                      <div>Interview </div>
                      <div className="mt-1 text-lg leading-6 text-slate-800">
                        {user.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4688af2750f4f5b9750d17ae55a1ce0775cd8c223d235fd5eacc6dca6cfd8ae3?apiKey=64ac1a7b85e84629af509d56edee2526&"
                      className="mt-12 aspect-square w-[45px] max-md:mt-10"
                    />
                    <div className="text-base font-light  text-neutral-500">
                      <div className="mt-10">Interview Date & Time</div>
                      <div className="mt-1 text-lg leading-6 text-slate-800">
                        {user.interviewDate}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-5 md:mt-10">
                <div className="flex flex-col ">
                  <div className="flex gap-4">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/38bf0f1c2af7685f155a2ba733ae8a52012cd0ca18a8bee4abfbfd824b3f6498?apiKey=64ac1a7b85e84629af509d56edee2526&"
                      className="shrink-0 aspect-square w-[45px]"
                    />
                    <div className="flex flex-col my-auto">
                      <div className="text-base font-light leading-6 text-neutral-500">
                        Results{" "}
                      </div>
                      <div className="text-lg leading-6 text-red-600">No</div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-12 max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ed505ccfcfd99147e4d04ef42003172c25c65c7ce7e42ac5c2b2301d701b3d5?apiKey=64ac1a7b85e84629af509d56edee2526&"
                      className="shrink-0 aspect-square w-[45px]"
                    />
                    <div className="flex flex-col my-auto">
                      <div className="text-base font-light leading-6 text-neutral-500">
                        Total Time Spent
                      </div>
                      <div className="mt-1 text-lg leading-6 text-slate-800">
                        {user.totalTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" basis-1/3 justify-center items-center px-4 py-4">
          <div className="flex flex-col lg:flex-row w-full justify-end">
            <button
              onClick={handlePrint}
              className=" flex items-center justify-center gap-2.5 px-[2%] py-[2%] text-sm text-white bg-sky-500 rounded-md border border-sky-500 border-solid cursor-pointer"
            >
              <span>Download PDF</span>
              <FiArrowUpRight size={20} />
            </button>
          </div>
          <div>
            <div className="flex mt-16 flex-col  self-start px-4">
              <div className="font-light leading-[150%]">Candidate Rating</div>
              <div className="flex gap-5 mt-4 whitespace-nowrap leading-[137.5%]">
                <div className="flex flex-col self-end whitespace-nowrap leading-[137.5%] items-center">
                  <div className="flex flex-col justify-center rounded-full border-2 border-solid border-red-500 stroke-[2px]">
                    <div className="justify-center place-content-center items-center px-2.5 bg-white rounded-full border-1 border-green-400 border-solid h-[51px] stroke-[2px] w-[51px]">
                      0-6
                    </div>
                  </div>
                  <div className="mt-2 place-content-center">No</div>
                </div>
                <div className="flex flex-col self-end whitespace-nowrap leading-[137.5%] items-center">
                  <div className="flex flex-col border-blue-500 justify-center rounded-full border-2 border-solid stroke-[2px]">
                    <div className="justify-center place-content-center items-center px-2.5 bg-white rounded-full border-1 border-green-400 border-solid h-[51px] stroke-[2px] w-[51px]">
                      6-8
                    </div>
                  </div>
                  <div className="mt-2">Yes</div>
                </div>
                <div className="flex flex-col self-end whitespace-nowrap leading-[137.5%]">
                  <div className="flex flex-col justify-center rounded-full border-2 border-solid border-neutral-500 stroke-[2px]">
                    <div className="justify-center place-content-center items-center px-2.5 bg-white rounded-full border-1 border-green-400 border-solid h-[51px] stroke-[2px] w-[51px]">
                      8-10
                    </div>
                  </div>
                  <div className="mt-2">Strong</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-1.5 px-2 pr-1 mt-12 bg-sky-50 rounded-md border border-solid border-black border-opacity-10 ">
        <div className="flex gap-5 max-lg:flex-col max-md:gap-0 justify-center">
          <div className="flex flex-col   lg:w-2/3 max-md:ml-30">
            {user.scores?.map((skill, index) => {
              return <UserInfo key={index} data={skill} />;
            })}
          </div>
          <div></div>
          <div className=" flex justify-center items-center lg:w-1/3">
            {user && <LoadingIndicator scores={user.scores}></LoadingIndicator>}
          </div>
        </div>
      </div>
      <div className="px-4  py-4 mt-12 bg-sky-50 rounded-md border border-solid border-black border-opacity-10 max-md:max-w-full">
        <EvaluationRecord user={user} />
      </div>

      <div className="gap-5 max-md:gap-0">
        {/* <div
              ref={printRef}
              className="flex flex-col px-7 pt-7 pb-20 bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full mt-0"
            >
             
            </div> */}
      </div>
    </div>
  );
};

export default Result;
