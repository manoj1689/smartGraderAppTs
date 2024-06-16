import React, { useState} from "react";
import { MdOutlineCreditScore } from "react-icons/md";
import CircleScore from "../../../assets/images/Individual/circleScore.png";
import { Scores } from "../../../types/interfaces/interface";
// Define the type for the scores state


const CircleScoreCard: React.FC = () => {
  const [scores, setScores] = useState<Scores>({
    technicalSkills: 35,
    softSkills: 55,
    commSkills: 10,
  });

  // Define the type for the change event
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setScores((prevScores) => ({
  //     ...prevScores,
  //     [name]: Number(value),
  //   }));
  // };

  return (
    <div className="grow pt-7 pr-8 w-full bg-white rounded-md border border-solid border-black border-opacity-10 max-md:mt-7 max-md:max-w-full">
      <div className="flex gap-5 max-sm:flex-col max-md:gap-0">
        <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col text-lg font-medium leading-6 text-slate-800 max-md:mt-10">
            <div className="flex gap-2.5 self-start ml-11 max-md:ml-2.5">
              <MdOutlineCreditScore size={24} color="#01AFF4" />
              <div className="flex-auto my-auto">Areas to Improve</div>
            </div>
            <img
              loading="lazy"
              src={CircleScore}
              width={350}
              height={350}
              className="mb-1"
              alt="Circle Score"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-16 max-md:mt-10">
            <div className="flex flex-col px-4 py-4 rounded-md border border-solid border-neutral-500">
              <div className="flex gap-2.5 text-2xl whitespace-nowrap text-slate-800">
                <div className="shrink-0 self-start w-3 h-3 bg-sky-500 rounded-full" />
                <div className="flex-auto">{scores.technicalSkills}%</div>
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
                Comms Skills
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleScoreCard;
