import React, { useState } from "react";
import { FaRegIdCard } from "react-icons/fa6";
import frontendLogo from "../../../assets/images/individual/frontendLogo.png";
import backendLogo from "../../../assets/images/individual/backend.png";
import frontendNext from "../../../assets/images/individual/frontendNext.png";
import { Result } from "../../../types/interfaces/interface";
// Define the type for the result object

const LineScoreCard: React.FC = () => {
  // Initialize the results state with a type annotation
  const [results, setResults] = useState<Result[]>([
    { id: 1, title: "Front End Developer", status: "Good", color: "bg-sky-500", score: 70 },
    { id: 2, title: "Backend Developer", status: "Improvement", color: "bg-red-500", score: 30 },
    { id: 3, title: "Full Stack Developer", status: "Excellent", color: "bg-emerald-600", score: 90 },
  ]);

  return (
    <div className="flex flex-col grow px-7 pt-5 pb-10 w-full bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:mt-7 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2.5 my-auto text-lg font-medium leading-6 text-slate-800">
          <FaRegIdCard size={24} color="#01AFF4" />
          <div className="flex-auto">Recent Interview Scores</div>
        </div>
      </div>
      <div className="shrink-0 mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 mt-10 max-md:flex-wrap">
        <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit max-md:max-w-full">
          {results.map((result) => (
            <div key={result.id} className="mb-12 max-md:mb-10">
              <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto text-base leading-4 text-slate-800">
                  {result.title}
                </div>
                <div className={`my-auto text-sm leading-5 ${result.status === "Good" ? "text-neutral-500" : result.status === "Improvement" ? "text-red-500" : "text-emerald-600"}`}>
                  {result.status}
                </div>
              </div>
              <div className="flex flex-col justify-center mt-4 rounded-md bg-zinc-300 max-md:max-w-full">
                <div
                  className={`shrink-0 ${result.color} rounded-md h-[5px] max-md:max-w-full`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <img
            loading="lazy"
            src={frontendLogo}
            className="aspect-square w-[47px]"
            alt="Frontend Icon"
          />
          <img
            loading="lazy"
            src={backendLogo}
            className="mt-6 aspect-square w-[67px]"
            alt="Backend Icon"
          />
          <img
            loading="lazy"
            src={frontendNext}
            className="mt-8 aspect-square w-[47px]"
            alt="Frontend Next Icon"
          />
        </div>
      </div>
    </div>
  );
}

export default LineScoreCard;
