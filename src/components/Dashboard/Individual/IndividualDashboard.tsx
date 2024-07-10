import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import codingDev from "../../../assets/images/Individual/codingdeveloper.png";
import star from "../../../assets/images/Individual/Star.png";
import graderLogo from "../../../assets/images/Individual/graderIcon.png";
import womanCheck from "../../../assets/images/Individual/woman-plan-todo-list.png";
import java from "../../../assets/images/Individual/javaLogo.png";
import achievement from "../../../assets/images/Individual/certificateAchievements.png";
import interView from "../../../assets/images/Individual/job-interview.png";
import LineScoreCard from "./LineScoreCard";
import CircleScoreCard from "./CircleScoreCard";
import { FiArrowUpRight } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NotificationBar from "../../common/Notification/NotificationBar";
import { FaMedal } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import {
  fetchData, // Importing the new fetchData function
  fetchSearchResults,
} from "../../../services/api/IndividaulDataService";
import { Category, Card } from "../../../types/interfaces/interface";
import { IndividualDashboardProps } from "../../../types/interfaces/interface";
import IndividualSets from "./IndividualSets";

const IndividualDashBoard: React.FC<IndividualDashboardProps> = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchList, setSearchList] = useState<Category[]>([]);
  const [query, setQuery] = useState<string>("");
  const matchingQuestionSets: any = [];
  const [showPreparationTips, setShowPreparationTips] =
    useState<boolean>(false);
  const [showAchievementsTips, setShowAchievementsTips] =
    useState<boolean>(false);
  const prevQueryRef = useRef<string>("");
  

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem("accessToken") || "";
      const { categoriesData, cardsData } = await fetchData(
        1,
        2,
        token,
        selectedCategories
      );
      setCategories(categoriesData);

      setCardsData(cardsData);
    };

    loadDashboardData();
  }, [selectedCategories]);

  useEffect(() => {
    if (query !== prevQueryRef.current) {
      prevQueryRef.current = query;
      const loadSearchResults = async () => {
        const results = await fetchSearchResults(query);
        setSearchList(results);
      };

      loadSearchResults();
    }
  }, [query]);

  const handleCardClick = (interview: any) => {
    navigate(`/dashboard/question/${interview.id}/instructions`, {
      state: { interview },
    });
  };

  const togglepreparationTips = () => {
    setShowPreparationTips(!showPreparationTips);
  };
  const toggleAchievementsTips = () => {
    setShowAchievementsTips(!showAchievementsTips);
  };

  return (
    <div className="container    mx-auto w-full h-full ">
      <div className="mt-20 lg:mt-10">
      <NotificationBar />
      </div>
     

      <div className="rounded-md mx-4 border border-solid my-4  border-black border-opacity-10 ">
        <div className=" px-2 py-5">
          <IndividualSets />
        </div>

     
      </div>

      <div className="pt-5 my-10  pl-8 bg-white rounded-md border border-solid border-black border-opacity-10 max-md:pl-5">
        <div className="flex flex-col md:flex-row ">
          <div className="md:basis-2/3 justify-center   flex flex-col xl:flex-row  gap-5  max-md:gap-0">
            <div className="  flex flex-col sm:flex-row ">
              <div className="mt-8">
                <div className=" text-lg font-semi-bold font-spline text-slate-800">
                <span className="flex gap-3">
                <RiAiGenerate size={24} color="#01AFF4" />
                Set Your Own Questions{" "}
                </span>
             
                </div>

                <div className="flex flex-col md:flex-row ">
                  <div className=" flex flex-col self-stretch my-auto text-lg font-light leading-8 text-neutral-500 ">
                    <div className="flex gap-2.5 mt-5 xl:mt-0 2xl:mt-8 ">
                      <IoCheckmark size={28} color="#01AFF4" />
                      <div className="flex-auto my-auto">
                        Create by Selecting Domain
                      </div>
                    </div>
                    <div className="flex gap-2.5 mt-3">
                      <IoCheckmark size={28} color="#01AFF4" />
                      <div className="flex-auto my-auto">
                        Create by Writing JD
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5  max-md:ml-0 max-md:w-full ">
                    <div className="flex flex-col self-stretch my-auto text-lg font-light leading-8 text-neutral-500 ">
                      <div className="flex gap-2.5 mt-3 2xl:mt-8 ">
                        <IoCheckmark size={28} color="#01AFF4" />
                        <div className="flex-auto my-auto">
                          Create by Resume Uploading
                        </div>
                      </div>
                      <div className="flex gap-2.5 mt-3">
                        <IoCheckmark size={28} color="#01AFF4" />
                        <div className="flex-auto my-auto">
                          Create by Your Own Questions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:basis-1/6 flex mx-auto justify-center items-center lg:pt-10 w-full h-full">
              <button
                //onClick={() => navigate("/dashboard/generatequestion")}
                onClick={() => navigate("/dashboard/createset")}
                type="button"
                className="flex flex-row items-center justify-center bg-blue-400 w-50 md:w-60 my-5 text-sm text-white px-4 py-3 mt-4 rounded-sm hover:bg-blue-500 transition duration-300"
              >
                <span className="mr-2 ">Let's Get Started</span>
                <FiArrowUpRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex md:basis-1/3 justify-center items-center ">
            <img
              loading="lazy"
              alt="womanCheck"
              src={womanCheck}
              className="w-96"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-10 lg:flex-row gap-3  max-lg:flex-col max-lg:gap-0">
        <div className="w-full lg:w-1/2 my-2 ">
          <LineScoreCard />
        </div>
        <div className="w-full lg:w-1/2 my-2 ">
          <CircleScoreCard />
        </div>
      </div>
      <div className="my-10 flex flex-col lg:flex-row ">
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="flex flex-col  px-2  py-8  pl-3.5 bg-white  border border-solid border-black border-opacity-10 w-full ">
            <div className="flex gap-3 self-start text-lg font-medium leading-6 whitespace-nowrap text-slate-800">
              <FaMedal size={20} color="#01AFF4" />
              <div className=" text-lg font-semi-bold font-spline text-[#2B383D]">Badges/Achievements</div>
            </div>
            <div className="shrink-0 mt-4  w-full   rounded-md border border-solid border-black border-opacity-10" />
            <div className="flex justify-between px-2  items-center">
              <div>
                <img
                  loading="lazy"
                  src={achievement}
                  className="mt-2.5 max-w-full aspect-[1.33] w-[109px]"
                />
                <div className="ml-5 text-sm leading-5 text-neutral-500">
                  Entry Level
                </div>
              </div>
              <div
                className=" mt-3.5 px-2 text-xs leading-4 text-sky-500 underline cursor-pointer"
                onClick={toggleAchievementsTips}
              >
                Start Earning Badges
              </div>
            </div>
            {showAchievementsTips && (
              <div className="font-spline text-sm font-light leading-5  text-neutral-700 my-5 px-2">
                Your achievements and badges will be displayed here as you
                progress through your interviews and challenges. Each badge
                represents a milestone in your journey, encouraging you to learn
                and excel. Begin your assessments to start collecting your
                badges!
              </div>
            )}
          </div>
          <div className="flex flex-col  font-light rounded-md border border-solid border-black border-opacity-10 w-full relative bg-white">
            <div className="mt-4 px-2">
            <div className="text-lg px-2 py-4 font-semi-bold font-spline text-[#2B383D]">
              <span className="flex items-center gap-3">
              <MdTipsAndUpdates size={20} color="#01AFF4" />
              Preparation Tips
              </span>
           
                  </div>
                  <div className="shrink-0   w-full h-px rounded-md border border-solid border-black border-opacity-10" />
                  <div className="mt-3 px-2 text-sm leading-5 text-neutral-500">
                    How to prepare for the upcoming session
                  </div>
            </div>
          <div  className="" >
                 
            <div className=" flex flex-col items-start lg:p-2.5 w-full mt-5">
              <div className="flex w-full ">
                
                  <div className="  relative ">
                    <img
                      loading="lazy"
                      alt="interview"
                      src={interView}
                      className="absolute bottom-0 right-0  z-0 opacity-30"
                    />
                    <div className="px-5 bg-transparent relative z-10">
                      <ul className="list-disc pl-5 text-neutral-700 text-sm font-spline">
                        <li className="mb-3">
                          <span className="font-semibold">
                            Review the Basics:
                          </span>{" "}
                          Before diving into advanced topics, ensure you have a
                          solid understanding of the foundational concepts in
                          your field.
                        </li>
                        <li className="mb-3">
                          <span className="font-semibold">
                            Practice Common Questions:
                          </span>{" "}
                          Familiarize yourself with frequently asked interview
                          questions and practice your responses to gain
                          confidence.{" "}
                        </li>
                      </ul>

                      {showPreparationTips && (
                        <>
                          <ul className="list-disc pl-5 text-neutral-700 text-sm font-spline">
                            <li className="mb-3">
                              <span className="font-semibold">
                                Mock Interviews:
                              </span>{" "}
                              Take advantage of SmartGrader's mock interview
                              feature to simulate the interview experience and
                              receive feedback on your performance.
                            </li>
                            <li className="mb-3">
                              <span className="font-semibold">
                                Stay Informed:
                              </span>{" "}
                              Keep up-to-date with the latest trends and
                              technologies relevant to your industry to showcase
                              your knowledge during interviews.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Relax and Reflect:
                              </span>{" "}
                              Prioritize your well-being. A calm mind will help
                              you think clearly and communicate effectively
                              during your interview.
                            </li>
                          </ul>
                        </>
                      )}
                      <span
                        className="mt-3.5 px-2 text-xs leading-4 text-sky-500 underline cursor-pointer"
                        onClick={togglepreparationTips}
                      >
                        {showPreparationTips ? "Read Less" : "Read More"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="relative">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  showPreparationTips ? "h-auto" : "h-0 overflow-hidden"
                }`}
              >
                <div className="flex w-full justify-end ">
                  <img
                    loading="lazy"
                    alt="interview"
                    src={interView}
                    className="w-1/3 h-auto object-cover"
                  />
                </div>
              </div>

            
            </div> */}
          </div>
        </div>

        {/* <div className="flex flex-col px-6 py-8 bg-white rounded-md border border-solid border-black border-opacity-10 lg:w-1/2 max-md:px-5">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5 self-start text-lg font-medium leading-6 items-center text-slate-800">
              <MdOutlineReviews size={25} color="gray" />
              <div className="flex-auto my-auto">Review Past Interviews</div>
            </div>
            <div className="justify-center px-2.5 py-2 text-xs font-light leading-4 rounded-md border border-solid border-neutral-500 text-neutral-500">
              View All
            </div>
          </div>
          <div className="shrink-0 mt-3 h-px border border-solid border-black border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-5 w-full justify-between self-start mt-6 text-base leading-4 text-slate-800">
            <img
              loading="lazy"
              src={rating}
              className="shrink-0 w-24 aspect-[4.76]"
            />
            <div className="flex-auto my-auto max-sm:text-sm">
              Frond End Developer
            </div>
          </div>
          <div className=" mt-2 text-base font-light leading-5 text-neutral-500  ">
            <ul className="my-5">
              <li className="my-3">
                Candidate excellent on technical skills but have to improve
                communications skills.
              </li>
              <li className="my-3">All other have good command on code. </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IndividualDashBoard;
