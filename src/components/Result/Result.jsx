import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReducedMotion } from "framer-motion";
import EvaluationRecord from "../../components/EvaluationRecord/EvaluationRecord";
import LoadingIndicator from "../../components/EvaluationRecord/LoadingIndicator";
import UserInfo from "../../components/EvaluationRecord/UserInfo";
import MaleEmp from "../../assets/images/Account/organization-person.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowUpRight } from "react-icons/fi";
import NotificationBar from "../common/Notification/NotificationBar";
import ErrorPage from "../common/Error/ErrorDisplay";
import { useLocation } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
// @ts-ignore
import {
  fetchExamResult,
  fetchExamScreenshots,
} from "../../services/api/ResultService";

import generatePDF from "react-to-pdf";
import PieChart from "../Result/PieChartScore";
import ResultCard from "../../assets/images/Result/ResultCard.jpg";
import calander from "../../assets/images/Result/calander.png";
import interview from "../../assets/images/Result/interview.png";
import result from "../../assets/images/Result/result.png";
import clock from "../../assets/images/Result/clock.png";
import { fetchSetDetail } from "../../services/api/SetService";
import { fetchUserData } from "../../services/api/NotificationBarService";
import { getToken } from "../../utils/tokenUtils";

const Result = () => {
  const location = useLocation();
  const targetRef = useRef();
  console.log("Set Attempt SetId and Data at result page", location.state);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  const printRef = useRef();
  const [setDetail, setSetDetails] = useState([]);
  const [setId, setSetId] = useState();
  const [examData, setExamData] = useState({});
  const [examScreenshots, setExamScreenShots] = useState([]);
  const [examId, setExamId] = useState("");
  const setData = location.state;
  // First useEffect to handle setting exam data and id
  console.log("set Data at result PAge", setData);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      fetchUserData(accessToken).then((data) => {
        if (data && data.is_verified === 1) {
          setUsername(data.name);
          //console.log(data)
        }
      });
    } else {
      console.error("Access token not found in local storage");
    }
  }, []);

  useEffect(() => {
    if (examData?.start_date) {
      const timestamp = examData.start_date;

      // Create a Date object from the timestamp
      const dateInUTC = new Date(timestamp);

      // Convert to IST (UTC+5:30)
      const istDate = new Date(dateInUTC.getTime() + 5.5 * 60 * 60 * 1000);

      // Format the IST date and time
      const optionsDate = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const optionsTime = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const dateString = istDate.toLocaleDateString("en-IN", optionsDate);
      const timeString = istDate.toLocaleTimeString("en-IN", optionsTime);

      setDate(dateString);
      setTime(timeString);
    } else {
      setDate("Date not available");
      setTime("Time not available");
    }
  }, [examData]);
  // Fetch Set Details by ExamId
  useEffect(() => {
    // Only fetch data if setId is valid
    if (setId) {
      const setDetail = async () => {
        try {
          const data = await fetchSetDetail(setId);
          setSetDetails(data);
          console.log(`set Details of attempted Exam ${setId}`, data);
        } catch (error) {
          setError(true);
          // toast.error("Failed to fetch data.");
        }
      };

      setDetail();
    }
  }, [examId]); // Dependency on examId

  // Fetch exam Result of Attempted Exam
  useEffect(() => {
    if (setData) {
      setExamData(setData.result);
      const id = setData.result.set_id;
      setSetId(id);
      const examId = setData.result.exam_id;
      setExamId(examId);
      console.log("Detail of set of SetId:", id);
      console.log("set_id", id, "Type of setId:", typeof id);
    } else {
      console.log("No state data available");
    }
  }, [setData]);

  // Second useEffect to fetch Details of Exam Result
  useEffect(() => {
    // Only fetch data if setId is valid
    if (examId) {
      const ExamResult = async () => {
        try {
          const data = await fetchExamResult(examId);
          setUser(data);
          console.log(`Result of Exam Attempt of ExamId ${setId}`, data);
        } catch (error) {
          setError(true);
          // toast.error("Failed to fetch data.");
        }
      };

      ExamResult();
    }
  }, [examId]); // Dependency on examId

  // To Fetch The ScreenShots

  useEffect(() => {
    // Only fetch data if setId is valid
    if (examId) {
      const ExamScreenshots = async () => {
        try {
          const data = await fetchExamScreenshots(examId);
          setExamScreenShots(data);
          console.log(`Result of Exam ScreenShots of ExamId ${setId}`, data);
        } catch (error) {
          setError(true);
          // toast.error("Failed to fetch data.");
        }
      };

      ExamScreenshots();
    }
  }, [examId]); // Dependency on examId

  //console.log("The Screenshot list in array",examScreenshots)

  const calculateTotalTime = (start, end) => {
    const startTime = new Date(start);

    const endTime = new Date(end);

    const diffInMs = endTime - startTime; // Difference in milliseconds
    const diffInSec = Math.floor(diffInMs / 1000); // Difference in seconds

    const hours = Math.floor(diffInSec / 3600); // Number of hours
    const minutes = Math.floor((diffInSec % 3600) / 60); // Number of minutes
    const seconds = diffInSec % 60; // Number of seconds

    return `${hours}h ${minutes}m ${seconds}s`;
  };
  const startTime = examData.start_date;
  const endTime = examData.end_date;
  const totalTime = calculateTotalTime(startTime, endTime);
  // console.log(examStartDetail.start_time, examEndDetail.end_time, totalTime);
  //console.log("SET STATUS OF EXAM DETAIL", examData.start_date);
  // console.log("SET STATUS AFTER AI SCORE", user, "Type of User:", typeof user);

  // console.log("Exam ID:", examId);
  console.log("set Details at result page", setDetail);
  return (
    <div className="container   mx-auto w-full h-full">
      <NotificationBar />

      <ToastContainer />
      <div ref={targetRef} className="px-4">
        <div className="flex my-5 gap-3 flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row w-full lg:w-2/3 rounded-lg border border-gray-200 overflow-hidden shadow-lg bg-white">
            {/* Left Section: User Information */}
            <div className="flex flex-col w-full  lg:w-1/3 bg-gradient-to-b from-blue-500 to-blue-300 text-white p-6 text-left">
              <div className="text-5xl font-extrabold mb-2 uppercase">
                {username}
              </div>

              <div className="text-2xl font-light mb-4">{setDetail.title}</div>
              <div className="text-lg">
                <strong>Date:</strong> {date}
              </div>
              <div className="text-lg">
                <strong>Time:</strong> {time}
              </div>
            </div>

            {/* Right Section: Assessment Summary */}
            <div className="flex flex-col lg:w-2/3 p-8 space-y-8 bg-blue-50">
              {/* Header */}
              <div className="text-3xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
                Assessment Summary
              </div>

              {/* Score Indicator */}
              <div className="flex justify-between items-center">
                <div className="text-xl font-medium text-gray-600">
                  Overall Score
                </div>
                <div className="relative flex items-center justify-center w-24 h-24 bg-white border border-gray-300 rounded-full shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-400 to-green-200 rounded-full opacity-75"></div>
                  <span className="text-4xl font-bold text-green-600 z-10">
                    75%
                  </span>
                </div>
              </div>

              {/* Result and Time Spent */}
              <div className="grid grid-cols-2 gap-6">
                {/* Result Card */}
                <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-md shadow-sm">
                  <div className="text-gray-600 font-medium text-lg">
                    Result
                  </div>
                  <div
                    className={`text-2xl font-bold mt-2 ${
                      result === "Pass" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                  
                   NO
                  </div>
                </div>

                {/* Time Spent Card */}
                <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-md shadow-sm">
                  <div className="text-gray-600 font-medium text-lg">
                    Time Spent
                  </div>
                  <div className="text-2xl font-bold text-gray-700 mt-2">
                    {totalTime}
                  </div>
                </div>
              </div>

              {/* Additional Notes Section */}
              <div className="p-4 bg-yellow-50 border border-gray-300 rounded-md shadow-sm">
                <div className="text-gray-600 font-medium text-lg">
                  Additional Notes
                </div>
                <div className="text-base text-slate-800  font-mono mt-2">
                  The candidate demonstrated strong problem-solving skills and a
                  good understanding of algorithms. They struggled with time
                  management, so additional practice on time-bound tasks might
                  be beneficial.
                </div>
              </div>
            </div>
          </div>

          {/* New Section: Performance and Rating */}
          <div className="flex flex-col lg:flex-col w-full lg:w-1/3 justify-center items-center rounded-lg border border-gray-200 shadow-lg p-6 bg-white">
            {/* Candidate Performance */}
            <div className="w-full mb-8">
              <div className="text-xl font-semibold text-slate-800 mb-4 border-b border-gray-300 pb-2">
                Candidate Performance
              </div>
              <div className="relative">
                <GaugeChart
                  id="gauge-chart6"
                  animate={true}
                  nrOfLevels={420}
                  arcsLength={[0.3, 0.5, 0.2]}
                 
                  arcPadding={0.02}
                  cornerRadius={2}
                  colors={["#87CEEB", "#6495ED", "#0047AB"]}
                  needleColor="#00BFFF"
                  needleBaseColor="#4169E1"
                  textColor="#008B8B"
                  fontSize="40"
                  className="w-full"
                />
              </div>
            </div>

            {/* Candidate Rating */}
            <div className="w-full">
              <div className="text-xl font-semibold text-slate-800 mb-4 border-b border-gray-300 pb-2">
                Candidate Rating
              </div>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                  <PieChart score={2} />
                  <div className="text-neutral-600 font-semibold mt-2">1-2</div>
                  <div className="text-gray-700">No</div>
                </div>
                <div className="flex flex-col items-center">
                  <PieChart score={3} />
                  <div className="text-neutral-600 font-semibold mt-2">3-4</div>
                  <div className="text-gray-700">Yes</div>
                </div>
                <div className="flex flex-col items-center">
                  <PieChart score={5} />
                  <div className="text-neutral-600 font-semibold mt-2">4-5</div>
                  <div className="text-gray-700">Strong</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {examId ? (
          <div>
            {/* <div className="py-1.5 px-2 pr-1 mt-12 bg-sky-50 rounded-md border border-solid border-black border-opacity-10 ">
              <div className="flex gap-5 max-lg:flex-col max-md:gap-0 justify-center">
                <div className="flex flex-col lg:w-2/3 max-md:ml-30">
                  <div className="text-2xl px-2 font-spline font-bold ">
                    Smart Score: AI Evaluation
                  </div>
                  {user.map((performance, index) => {
                    return (
                      <UserInfo
                        key={index}
                        data={performance}
                        questionNumber={index + 1}
                      />
                    );
                  })}
                </div>

                <div className=" flex justify-center items-center lg:w-1/3">
                  {user && (
                    <LoadingIndicator scores={user.scores}></LoadingIndicator>
                  )}
                </div>
              </div>
            </div> */}
            <div className="px-4  py-4 mt-12 bg-sky-50 rounded-md border border-solid border-black border-opacity-10 max-md:max-w-full">
              <EvaluationRecord user={user} screenshotsList={examScreenshots} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full p-20 justify-center">
              Please Select Exam to View Score
            </div>
          </>
        )}

        <div className="w-full flex justify-cetre my-10">
          {" "}
          <button
            onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
            className=" flex items-center justify-center gap-2.5 p-4 w-10/12 md:w-1/2 mx-auto text-sm text-white bg-sky-500 rounded border border-sky-500 border-solid cursor-pointer"
          >
            <span>Download PDF</span>
            <FiArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
