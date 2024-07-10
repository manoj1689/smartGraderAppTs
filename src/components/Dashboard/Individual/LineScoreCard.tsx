import React, { useEffect, useState } from "react";
import { FaRegIdCard } from "react-icons/fa6";
import { fetchSetAttemps } from "../../../services/api/LineScoreService";
import { LineScore } from "../../../types/interfaces/interface";
import { getToken } from "../../../utils/tokenUtils";
import noRecordFound from "../../../assets/images/Individual/NoRecordFound.png";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const LineScoreCard: React.FC = () => {
  const navigate=useNavigate();

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
        const data = await fetchSetAttemps(token);
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
    <div className="flex flex-col grow  px-7 pt-5 w-full bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:mt-7 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2.5 my-auto text-lg font-medium leading-6 text-slate-800">
          <FaRegIdCard size={24} color="#01AFF4" />
          <div className=" text-lg font-semi-bold font-spline text-slate-800">Recent Interview Scores</div>
        </div>
      </div>
      <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 mt-10 max-h-[352px] overflow-y-auto max-md:flex-wrap">
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
              <div key={result.id} className="mb-10 max-md:mb-10 cursor-pointer " onClick={()=>navigate('result')}>
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
                          strokeDashoffset: 150 - (result.rating / 5) * 150,
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LineScoreCard;
