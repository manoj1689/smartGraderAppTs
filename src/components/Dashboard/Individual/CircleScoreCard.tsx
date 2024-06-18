import React, { useState } from "react";
import { MdOutlineCreditScore, MdArrowOutward } from "react-icons/md";
import CircleGraph from "../../../assets/images/Individual/CircleGraph.webp";
import { Scores } from "../../../types/interfaces/interface";

const CircleScoreCard: React.FC = () => {
  const [scores, setScores] = useState<Scores>({
    technicalSkills: 35,
    softSkills: 55,
    commSkills: 10,
  });
  const [scoreData, setScoreData] = useState<boolean>(true);
  const ScoreAchieve = {
    technicalSkills: 20,
    softSkills: 10,
    commSkills: 70,
  };

  // Calculate offsets based on scores
  const softOffset = 100 - (scores.technicalSkills + scores.softSkills);
  const commOffset =
    100 - (scores.technicalSkills + scores.softSkills + scores.commSkills);

  const [viewSample, setViewSample] = useState<boolean>(false);

  const toggleViewSample = () => {
    setViewSample(!viewSample);
  };

  return (
    <div className="flex flex-col grow px-7 py-5  w-full bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:mt-7 max-md:max-w-full">
      <div className="flex w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
          <div className="flex flex-col gap-2.5 my-auto text-lg font-medium leading-6 text-slate-800">
            <div className="flex gap-2.5">
              <MdOutlineCreditScore size={24} color="#01AFF4" />
              <div className="flex-auto my-auto">Areas to Improve</div>
            </div>
            <div className="shrink-0 mt-1 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
            <div className="my-9">
            {scoreData && (
              <>
                <div className="flex flex-col w-full md:flex-row">
                  <div className="relative w-full  h-72 flex items-center justify-center lg:w-1/2">
                    <svg
                      className="absolute w-full h-full bg-slate-100"
                      viewBox="-5 -5 45 45"
                    >
                      {/* Technical Skills */}
                      <circle
                        className="text-sky-500"
                        stroke="currentColor"
                        strokeWidth="10" // Adjust thickness as desired
                        strokeDasharray={`${ScoreAchieve.technicalSkills} ${
                          100 - ScoreAchieve.technicalSkills
                        }`}
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      />

                      {/* Soft Skills */}
                      <circle
                        className="text-orange-300"
                        stroke="currentColor"
                        strokeWidth="10" // Adjust thickness as desired
                        strokeDasharray={`${ScoreAchieve.softSkills} ${
                          100 - ScoreAchieve.softSkills
                        }`}
                        strokeDashoffset={`-${ScoreAchieve.technicalSkills}`}
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      />

                      {/* Communication Skills */}
                      <circle
                        className="text-orange-200"
                        stroke="currentColor"
                        strokeWidth="10" // Adjust thickness as desired
                        strokeDasharray={`${ScoreAchieve.commSkills} ${
                          100 - ScoreAchieve.commSkills
                        }`}
                        strokeDashoffset={`-${
                          ScoreAchieve.technicalSkills + ScoreAchieve.softSkills
                        }`}
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      />
                    </svg>
                  </div>

                  <div className="lg:w-1/2 lg:px-4">
                    <>
                      <div className="flex flex-col px-4 py-4 rounded-md border border-solid border-neutral-500">
                        <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                          <div className="shrink-0 self-start w-3 h-3 bg-sky-500 rounded-full" />
                          <div className="flex-auto">
                            {ScoreAchieve.technicalSkills}%
                          </div>
                        </div>
                        <div className="mt-2.5 text-base leading-4 text-neutral-500">
                          Technical Skills
                        </div>
                      </div>
                      <div className="flex flex-col items-start py-4 pr-16 pl-4 mt-1.5 rounded-md border border-solid border-neutral-500 max-md:pr-5">
                        <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                          <div className="shrink-0 self-start w-3 h-3 bg-orange-300 rounded-full" />
                          <div>{ScoreAchieve.softSkills}%</div>
                        </div>
                        <div className="mt-2 text-base leading-4 text-neutral-500">
                          Soft Skills
                        </div>
                      </div>
                      <div className="flex flex-col items-start py-4 pr-12 pl-4 mt-1.5 rounded-md border border-solid border-neutral-500 max-md:pr-5">
                        <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                          <div className="shrink-0 self-start w-3 h-3 bg-orange-200 rounded-full" />
                          <div>{ScoreAchieve.commSkills}%</div>
                        </div>
                        <div className="mt-2.5 text-base leading-4 text-neutral-500">
                          Communication Skills
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </>
            )}
            </div>
           
            {!scoreData && (
              <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-5">
                  <div className="flex flex-col">
                    <div
                      onClick={toggleViewSample}
                      className="flex w-full gap-3 justify-end items-center text-gray-600 px-4 py-3 cursor-pointer"
                    >
                      <span className="text-sm">View Sample</span>{" "}
                      <span>
                        <MdArrowOutward size={15} />
                      </span>
                    </div>
                    {!viewSample ? (
                      <div className="w-full  justify-center">
                        <img
                          loading="lazy"
                          src={CircleGraph}
                          className="sm:w-7/12 mx-auto  mt-1"
                          alt="Circle Graph"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col w-full md:flex-row">
                          <div className="relative w-full  h-72 flex items-center justify-center lg:w-1/2">
                            <svg
                              className="absolute w-full h-full bg-slate-100"
                              viewBox="-5 -5 45 45"
                            >
                              {/* Technical Skills */}
                              <circle
                                className="text-sky-500"
                                stroke="currentColor"
                                strokeWidth="10" // Adjust thickness as desired
                                strokeDasharray={`${scores.technicalSkills} ${
                                  100 - scores.technicalSkills
                                }`}
                                fill="none"
                                cx="18"
                                cy="18"
                                r="15.91549431"
                              />

                              {/* Soft Skills */}
                              <circle
                                className="text-orange-300"
                                stroke="currentColor"
                                strokeWidth="10" // Adjust thickness as desired
                                strokeDasharray={`${scores.softSkills} ${
                                  100 - scores.softSkills
                                }`}
                                strokeDashoffset={`-${scores.technicalSkills}`}
                                fill="none"
                                cx="18"
                                cy="18"
                                r="15.91549431"
                              />

                              {/* Communication Skills */}
                              <circle
                                className="text-orange-200"
                                stroke="currentColor"
                                strokeWidth="10" // Adjust thickness as desired
                                strokeDasharray={`${scores.commSkills} ${
                                  100 - scores.commSkills
                                }`}
                                strokeDashoffset={`-${
                                  scores.technicalSkills + scores.softSkills
                                }`}
                                fill="none"
                                cx="18"
                                cy="18"
                                r="15.91549431"
                              />
                            </svg>
                          </div>

                          <div className="lg:w-1/2 lg:px-4">
                            <>
                              <div className="flex flex-col px-4 py-4 rounded-md border border-solid border-neutral-500">
                                <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                                  <div className="shrink-0 self-start w-3 h-3 bg-sky-500 rounded-full" />
                                  <div className="flex-auto">
                                    {scores.technicalSkills}%
                                  </div>
                                </div>
                                <div className="mt-2.5 text-base leading-4 text-neutral-500">
                                  Technical Skills
                                </div>
                              </div>
                              <div className="flex flex-col items-start py-4 pr-16 pl-4 mt-1.5 rounded-md border border-solid border-neutral-500 max-md:pr-5">
                                <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                                  <div className="shrink-0 self-start w-3 h-3 bg-orange-300 rounded-full" />
                                  <div>{scores.softSkills}%</div>
                                </div>
                                <div className="mt-2 text-base leading-4 text-neutral-500">
                                  Soft Skills
                                </div>
                              </div>
                              <div className="flex flex-col items-start py-4 pr-12 pl-4 mt-1.5 rounded-md border border-solid border-neutral-500 max-md:pr-5">
                                <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                                  <div className="shrink-0 self-start w-3 h-3 bg-orange-200 rounded-full" />
                                  <div>{scores.commSkills}%</div>
                                </div>
                                <div className="mt-2.5 text-base leading-4 text-neutral-500">
                                  Communication Skills
                                </div>
                              </div>
                            </>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleScoreCard;
