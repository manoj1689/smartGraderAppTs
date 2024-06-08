
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReducedMotion } from "framer-motion";
import EvaluationRecord from "../../components/EvaluationRecord/EvaluationRecord";
import LoadingIndicator from "../../components/EvaluationRecord/LoadingIndicator";
import UserInfo from "../../components/EvaluationRecord/UserInfo";
import MaleEmp from "../../assets/images/GenerateQuestions/male-employee-tick-in-checkbox.png";
import { MESSAGES } from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowUpRight } from "react-icons/fi";
// @ts-ignore
import  fetchResultData from "../../services/api/ResultService"
const Result = () => {
  const [user, setUser] = useState({});
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResultData();
        setUser(data);
        console.log(data);
      } catch (error) {
        // Handle the error appropriately in your UI
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

  return (  
  <div className="container mx-auto w-full flex-col  justify-center bg-orange-300">
    <ToastContainer />
    <div className="gap-5 bg-orange-400  max-md:gap-0">
      <div>
        <div>
          <div
            ref={printRef}
            className="flex flex-col px-7 pt-7 pb-20 bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full mt-0"
          >
            <div >
              <div className="flex flex-col md:flex-row gap-5  max-md:gap-0">
                
                  <img
                    loading="lazy"
                    src={MaleEmp}
                    alt="Fail to load image"
                   className="h-1/2"
                  />
                   <div className="flex flex-col ml-5 w-full max-md:ml-0">
                  <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 px-px w-full max-md:flex-wrap max-md:max-w-full justify-between">
                      <div className="my-auto text-2xl font-medium leading-6 text-sky-500">
                        {user.name}
                      </div>
                      <div
                        onClick={handlePrint}
                        className="flex flex-1 gap-2.5 justify-center px-[2%] py-[2%] text-sm text-white bg-sky-500 rounded-md border border-sky-500 border-solid cursor-pointer max-md:px-5 md:max-w-[20%]"
                      >
                        <div>Download PDF</div>
                        <FiArrowUpRight size={20} />
                      </div>
                    </div>
                    <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
                    <div className="mt-8 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-full max-md:ml-0">
                          <div className="flex gap-4 max-md:mt-10">
                            <div className="flex flex-col items-center gap-[20%]">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/689799648e219099fa2906c4eecba4d25378612e478c66530469674a9f3f5960?apiKey=64ac1a7b85e84629af509d56edee2526&"
                                className="aspect-square w-[45px]"
                              />
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4688af2750f4f5b9750d17ae55a1ce0775cd8c223d235fd5eacc6dca6cfd8ae3?apiKey=64ac1a7b85e84629af509d56edee2526&"
                                className="mt-12 aspect-square w-[45px] max-md:mt-10"
                              />
                            </div>
                            <div className="flex flex-col self-start mt-1 text-base font-light leading-6 text-neutral-500">
                              <div>Interview </div>
                              <div className="mt-3 text-lg leading-6 text-slate-800">
                                {user.role}
                              </div>
                              <div className="mt-14 max-md:mt-10">
                                Interview Date & Time
                              </div>
                              <div className="mt-3 text-lg leading-6 text-slate-800">
                                {user.interviewDate}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-full max-md:ml-0">
                          <div className="grow max-md:mt-10 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                              <div className="flex flex-col w-full max-md:ml-0">
                                <div className="flex flex-col max-md:mt-10">
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
                                      <div className="mt-3 text-lg leading-6 text-red-600">
                                        No
                                      </div>
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
                                      <div className="mt-2 text-lg leading-6 text-slate-800">
                                        {user.totalTime}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col ml-5 w-full max-md:ml-0">
                                <div className="flex grow gap-5 justify-between items-start px-3 py-6 text-base rounded-md border border-solid border-black border-opacity-10 text-neutral-500 max-md:px-5 max-md:mt-10">
                                  <div className="flex flex-col self-start">
                                    <div className="font-light leading-[150%]">
                                      Candidate Rating
                                    </div>
                                    <div className="flex gap-5 mt-4 whitespace-nowrap leading-[137.5%]">
                                      <div className="flex flex-col self-end whitespace-nowrap leading-[137.5%] items-center">
                                        <div className="flex flex-col justify-center rounded-full border-2 border-solid border-red-500 stroke-[2px]">
                                          <div className="justify-center place-content-center items-center px-2.5 bg-white rounded-full border-1 border-green-400 border-solid h-[51px] stroke-[2px] w-[51px]">
                                            0-6
                                          </div>
                                        </div>
                                        <div className="mt-2 place-content-center">
                                          No
                                        </div>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-1.5 px-2 pr-1 mt-12 bg-sky-50 rounded-md border border-solid border-black border-opacity-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-center">
                      <div className="flex flex-col w-full max-md:ml-0">
                        {user.scores?.map((skill, index) => {
                          return <UserInfo key={index} data={skill} />;
                        })}
                      </div>
                      {user && (
                        <LoadingIndicator scores={user.scores}></LoadingIndicator>
                      )}
                    </div>
                  </div>
                  <EvaluationRecord user={user} />
                </div>
                </div>
               
           
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Result;
