import React, { useEffect, useState } from "react";
import { FaRegIdCard } from "react-icons/fa6";
import { fetchexamAttemps } from "../../../services/api/LineScoreService";
import { LineScore } from "../../../types/interfaces/interface";
import { getToken } from "../../../utils/tokenUtils";
import noRecordFound from "../../../assets/images/Individual/NoRecordFound.png";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
//@ts-ignore
import DateFormat from "../../common/Date/DateFormat";
const LineScoreCard: React.FC = () => {
  const navigate = useNavigate();

  const [results, setResults] = useState<LineScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state if needed
  const [viewSample, setViewSample] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          console.error("Token not found.");
          return;
        }
        const data = await fetchexamAttemps(token);
        //setResults([]);

        setResults(data);
        setLoading(false); // Set loading state to false after data fetch
      } catch (error) {
        console.error("Error fetching attempts:", error);
        setLoading(false); // Set loading state to false on error
      }
    };

    fetchData();
  }, []);

  console.log("the result List have set id for each attempt ", results);

  const sampleResult = [
    {
      id: "1",
      title: "Sample Title 1",
      rating: 3.5,
    },
    {
      id: "2",
      title: "Sample Title 2",
      rating: 1,
    },
  ];

  const getColor = (rating: number) => {
    if (rating === 0) return "text-red-500";
    if (rating >= 4) return "text-emerald-600";
    if (rating >= 2) return "text-sky-500";
    return "text-red-500";
  };

  const getCircleColor = (rating: number) => {
    if (rating === 0) return "stroke-red-500";
    if (rating >= 4) return "stroke-emerald-600";
    if (rating >= 2) return "stroke-sky-500";
    return "stroke-red-500";
  };

  const getBarColor = (rating: number) => {
    if (rating === 0) return "bg-red-500";
    if (rating >= 4) return "bg-emerald-600";
    if (rating >= 2) return "bg-sky-500";
    return "bg-red-500";
  };

  const getLabel = (rating: number) => {
    if (rating === 0) return "Poor";
    if (rating >= 4) return "Excellent";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Average";
    return "Poor";
  };
  const getLevel = (level: number) => {
    if (level === 0) return "Easy";
    if (level === 1) return "Medium";
    if (level === 2) return "Hard";
    return "Basic";
  };
  const getLevelColor = (level: number) => {
    if (level === 0) return "text-red-500";
    if (level === 1) return "text-emerald-600";
    if (level === 2) return "text-sky-500";
    return "text-red-500";
  };

  const getLabelColor = (rating: number) => {
    if (rating === 0) return "text-red-500";
    if (rating >= 4) return "text-emerald-600";
    if (rating >= 3) return "text-sky-500";
    if (rating >= 2) return "text-yellow-500";
    return "text-red-500";
  };
  const toggleViewSample = () => {
    setViewSample(!viewSample);
  };
  return (
    <div className="flex flex-col grow  p-4 w-full bg-white rounded-md border border-solid border-black border-opacity-10 ">
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2.5 my-auto text-lg font-medium leading-6 text-slate-800">
          <FaRegIdCard size={24} color="#01AFF4" />
          <div className=" text-lg font-semi-bold font-spline text-slate-800">
            Latest Attempt AI Score
          </div>
        </div>
      </div>
      <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 mt-8  md:mt-16 lg:mt-12 xl:mt-4 max-h-[352px] overflow-y-auto max-md:flex-wrap">
        <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit max-md:max-w-full">
          {loading ? (
            <p>Loading...</p>
          ) : results.length === 0 ? (
            <>
              <div className="flex  flex-col items-center justify-center">
                <div
                  onClick={toggleViewSample}
                  className="flex w-full gap-3 justify-end items-center text-gray-600 px-4 py-2 cursor-pointer"
                >
                  <span className="text-sm">View Sample</span>{" "}
                  <span>
                    <MdArrowOutward size={15} />
                  </span>
                </div>

                {viewSample && (
                  <div className="w-full justify-center ">
                    <img
                      src={noRecordFound}
                      alt="noRecordFound"
                      className="sm:w-2/5 mx-auto "
                    />
                  </div>
                )}
                {!viewSample &&
                  sampleResult.map((result) => (
                    <div key={result.id} className="mb-10 max-md:mb-10 w-full">
                      <div className="flex items-center gap-5 max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col flex-auto">
                          <div className="flex justify-between">
                            <div className="text-base leading-4 font-spline text-slate-800">
                              {result.title}
                            </div>
                            <div
                              className={`text-sm font-spline ${getLabelColor(
                                result.rating
                              )}`}
                            >
                              {getLabel(result.rating)}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center mt-4 rounded-md bg-zinc-300 w-full">
                            <div
                              className={`shrink-0 ${getBarColor(
                                result.rating
                              )} rounded-md h-[5px]`}
                              style={{
                                width: `${((result.rating + 0.2) / 5) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                          <svg className="w-16 h-16">
                            <circle
                              className="text-gray-300"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="transparent"
                              r="24"
                              cx="30"
                              cy="30"
                            />
                            <circle
                              className={`transition duration-300 ${getCircleColor(
                                result.rating
                              )}`}
                              strokeWidth="2"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="24"
                              cx="30"
                              cy="30"
                              style={{
                                strokeDasharray: 150,
                                strokeDashoffset:
                                  150 - (result.rating / 5) * 150,
                              }}
                            />
                            <text
                              x="50%"
                              y="50%"
                              dy=".3em"
                              textAnchor="middle"
                              className={`font-spline text-xs ${getColor(
                                result.rating
                              )}`}
                              fill="currentColor"
                            >
                              {result.rating.toFixed(1)} / 5
                            </text>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            results.map((result) => (
              <div
                key={result.exam_id}
                className="my-4 cursor-pointer p-4 rounded-lg bg-sky-100 shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate("result", { state: { result } })}
              >
                <div className="flex flex-col lg:flex-row ">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div>
                        <h3 className="text-lg font-spline font-semibold text-gray-800">
                          {result.set_data.title}
                        </h3>
                      </div>
                      <div>
                        <Rating style={{ maxWidth: 120 }} value={3} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center ">
                     
                      <div>
                        <div
                          className={`text-md font-medium ${getLevelColor(
                            result.score
                          )}`}
                        >
                          <span className="text-gray-500">Level:</span>{" "}
                          {getLevel(result.score)}
                        </div>
                        <div className="text-md font-medium text-gray-500 flex-1">
                          No Of Questions:{" "}
                          <span className="text-sky-600">{result.q_count}</span>
                        </div>
                      </div>
                      <div>
                        <DateFormat start_date={result?.start_date} />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="text-lg text-gray-800">Score</div>
                      <div className="flex-1 ml-4">
                        <div className="relative h-2 bg-gray-200 rounded-full">
                          <div
                            className={`absolute top-0 left-0 h-full rounded-full ${getBarColor(
                              result.q_count
                            )}`}
                            style={{
                              width: `${Math.min(
                                (result.q_count / 20) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LineScoreCard;
