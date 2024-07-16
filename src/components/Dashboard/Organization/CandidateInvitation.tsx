import React, { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
interface Candidate {
  name: string;
  role: string;
  image: string;
  status: "Active" | "On Leave" | "Inactive";
}

const candidates: Candidate[] = [
  {
    name: "Wade Warren",
    role: "UI/UX Designer",
    image: "https://via.placeholder.com/55",
    status: "Active",
  },
  {
    name: "Jenny Wilson",
    role: "Backend Developer",
    image: "",
    status: "On Leave",
  },
  {
    name: "Ronald Richards",
    role: "IOS Developer",
    image: "https://via.placeholder.com/55",
    status: "Active",
  },
  {
    name: "Floyd Miles",
    role: "Frontend Developer",
    image: " ",
    status: "Active",
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-600",
  "On Leave": "bg-yellow-500",
  Inactive: "bg-red-500",
};

const CandidateInvitation: React.FC = () => {
  const navigate=useNavigate()
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(candidates.length).fill(true));

  const handleImageError = (index: number) => {
    const newImageLoaded = [...imageLoaded];
    newImageLoaded[index] = false;
    setImageLoaded(newImageLoaded);
  };

  return (
    <div className="flex flex-col grow  p-4 w-full bg-white rounded-md border border-solid border-black border-opacity-10 ">
      <div className="flex gap-3.5 self-start items-center text-lg font-medium leading-6  text-slate-800">
        <FaArrowUpRightFromSquare size={24} color="#01AFF4"/>
        <div className=" text-md md:text-lg font-semi-bold font-spline text-slate-800">Candidate Invitation & Monitoring</div>
      </div>
      <div className="shrink-0 mt-3 border border-solid bg-black bg-opacity-10 border-black border-opacity-10" />
      <div className="justify-between mt-5 w-full">
        <div>
          {candidates.map((candidate, index) => (
            <div key={index} className="flex flex-col w-full hover:bg-blue-100 rounded-sm transition duration-300 cursor-pointer" onClick={()=>navigate('/dashboard/candidateinvitation')}>
              <div className="flex flex-row justify-between items-center my-5 px-2 sm:px-4 md:px-8">
                <div className="flex flex-col lg:flex-row justify-center items-start gap-5">
                  {imageLoaded[index] && candidate.image ? (
                    <img
                      loading="lazy"
                      src={candidate.image}
                      className="rounded-full aspect-square w-[65px] h-[65px]"
                      alt={candidate.name}
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="shrink-0 rounded-full aspect-square w-[65px] h-[65px] bg-blue-200 flex items-center justify-center text-xl text-gray-500">
                      {candidate.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="flex gap-2.5">
                      <div className="flex-auto my-auto text-lg leading-6 text-slate-800">
                        {candidate.name}
                      </div>
                      <div
                        className={`justify-center px-2.5 py-1 text-xs leading-4 text-white whitespace-nowrap rounded-md border border-solid ${
                          statusStyles[candidate.status]
                        }`}
                      >
                        {candidate.status}
                      </div>
                    </div>
                    <div className="mt-1 text-sm font-light leading-5 text-neutral-500">
                      {candidate.role}
                    </div>
                  </div>
                </div>
                <div>
                  <HiDotsHorizontal size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateInvitation;
