import React, { useState } from "react";
import { IoNavigate } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Performance {
  type: "Excellent" | "Rejected" | "Average";
  percentage: number;
}

interface Candidate {
  name: string;
  role: string;
  image: string;
  performance: Performance[];
}

const candidates: Candidate[] = [
  {
    name: "Wade Warren",
    role: "UI/UX Designer",
    image: "https://via.placeholder.com/55",
    performance: [{ type: "Average", percentage: 70 }],
  },
  {
    name: "Leslie Alexander",
    role: "Backend Developer",
    image: " ",
    performance: [{ type: "Excellent", percentage: 85 }],
  },
  {
    name: "Robert Fox",
    role: "IOS Developer",
    image: "https://via.placeholder.com/55",
    performance: [{ type: "Rejected", percentage: 20 }],
  },
  {
    name: "Kristin Watson",
    role: "Marketing Manager",
    image: "https://via.placeholder.com/55",
    performance: [{ type: "Average", percentage: 65 }],
  },
];

const performanceStyles: Record<string, string> = {
  Excellent: "bg-emerald-600",
  Rejected: "bg-red-500",
  Average: "bg-sky-500",
};

const performanceTextStyles: Record<string, string> = {
  Excellent: "text-green-500",
  Rejected: "text-red-500",
  Average: "text-orange-500",
};

const CandidateResults: React.FC = () => {
  const navigate=useNavigate()
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(candidates.length).fill(true));

  const handleImageError = (index: number) => {
    const newImageLoaded = [...imageLoaded];
    newImageLoaded[index] = false;
    setImageLoaded(newImageLoaded);
  };

  return (
    <div className="flex flex-col grow  p-4 w-full bg-white rounded-md border border-solid border-black border-opacity-10 ">
   
        <div className="flex gap-3.5 self-start  text-lg font-medium leading-6 text-slate-800">
          <FaIdCard size={30} color="#01AFF4" />
          <div className=" text-md md:text-lg font-semi-bold font-spline text-slate-800">Candidates Results</div>
        </div>
        
    
      <div className="shrink-0 mt-3 mb-5 border border-solid bg-black bg-opacity-10 border-black border-opacity-10" />

      <div>
        {candidates.map((candidate, index) => (
          <div key={index} className=" py-5  sm:px-4 hover:bg-blue-100 rounded-sm transition duration-300  cursor-pointer" onClick={()=>navigate('/dashboard/candidateresult')}>
            <div className="flex flex-col justify-between md:flex-row ">
              <div className="flex flex-row w-full md:w-1/2 gap-5">
                {imageLoaded[index] ? (
                  <img
                    loading="lazy"
                    src={candidate.image}
                    className="shrink-0 rounded-full aspect-square w-[65px] h-[65px]"
                    alt={candidate.name}
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="shrink-0 rounded-full aspect-square w-[65px] h-[65px] bg-blue-200 flex items-center justify-center text-xl text-gray-500">
                    {candidate.name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col my-auto">
                  <div className="text-lg leading-6 text-slate-800">
                    {candidate.name}
                  </div>
                  <div className="mt-2.5 text-sm font-light leading-5 text-neutral-500">
                    {candidate.role}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/2 self-stretch my-auto">
                {candidate.performance.map((perf, perfIndex) => (
                  <div
                    className="flex flex-col text-sm leading-5 text-neutral-500 max-md:pl-5 mb-6"
                    key={perfIndex}
                  >
                    <div
                      className={`text-sm self-end leading-5 ${
                        performanceTextStyles[perf.type]
                      }`}
                    >
                      {perf.type}
                    </div>
                    <div className="shrink-0 self-start mt-4 rounded-md bg-zinc-300 h-[5px] w-full relative">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-md ${
                          performanceStyles[perf.type]
                        }`}
                        style={{ width: `${perf.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateResults;
