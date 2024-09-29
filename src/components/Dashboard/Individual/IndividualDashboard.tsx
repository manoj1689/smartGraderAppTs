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
import ManSitting from "../../../assets/images/Individual/man-sitting.jpg";
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
    useState<boolean>(true);
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
    <div className="p-2 w-full h-full max-md:pt-24 ">
      <NotificationBar />

      <div>
        <div className=" px-2 py-5">
          <IndividualSets />
        </div>
      </div>

      <div className="my-10 mx-4 px-4 bg-white rounded-md border border-solid border-black border-opacity-10 shadow-lg">
  <div className="flex lg:flex-row flex-col gap-5">
    <div className="flex lg:basis-1/3 justify-center items-center order-1 lg:order-2">
      <img
        loading="lazy"
        alt="Man Sitting"
        src={ManSitting}
        className="w-96"
      />
    </div>
    <div className="flex flex-col lg:basis-2/3 gap-5 order-2 lg:order-1">
      <div className="flex mt-4 gap-3 text-lg font-semibold text-slate-800">
        <RiAiGenerate size={24} color="#01AFF4" />
        Set Your Own Questions
      </div>
      <div className="w-full flex gap-3 bg-sky-100 shadow-md rounded-md p-4 flex-col md:flex-row lg:flex-col xl:flex-row items-center">
        <div className="w-full flex flex-col gap-3 justify-center">
          <div className="flex items-center gap-2.5 w-full">
            <IoCheckmark size={28} color="#01AFF4" />
            <div className="flex-grow my-auto overflow-hidden text-ellipsis text-lg font-light leading-8 text-neutral-500">
              Create by Selecting Domain
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full">
            <IoCheckmark size={28} color="#01AFF4" />
            <div className="flex-grow my-auto overflow-hidden text-ellipsis text-lg font-light leading-8 text-neutral-500">
              Create by Writing JD
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center">
          <div className="flex items-center gap-2.5 w-full">
            <IoCheckmark size={28} color="#01AFF4" />
            <div className="flex-grow my-auto overflow-hidden text-ellipsis text-lg font-light leading-8 text-neutral-500">
              Create by Resume Uploading
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full">
            <IoCheckmark size={28} color="#01AFF4" />
            <div className="flex-grow my-auto overflow-hidden text-ellipsis text-lg font-light leading-8 text-neutral-500">
              Create by Your Own Questions
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => navigate("/dashboard/generatequestion")}
          type="button"
          className="flex flex-row items-center justify-center bg-sky-700 w-50 md:w-60 my-5 text-sm text-white px-4 py-3 mt-4 rounded-sm transition duration-300 hover:bg-sky-800 transform hover:scale-105"
        >
          <span className="mr-2">Let's Get Started</span>
          <FiArrowUpRight size={20} />
        </button>
      </div>
    </div>
  </div>
</div>


         
          
     

      <div className="mx-4">
        <div className="flex  flex-col mb-10 lg:flex-row gap-5  max-lg:flex-col max-lg:gap-0">
          <div className="w-full lg:w-1/2 h-full my-2 ">
            <LineScoreCard />
          </div>
          <div className="w-full lg:w-1/2 h-full my-2 ">
            <CircleScoreCard />
          </div>
        </div>
        <div className="flex  flex-col mb-10 lg:flex-row gap-5  max-lg:flex-col">
          <div className="flex flex-col p-4  pl-3.5 bg-white rounded-md border border-solid border-black border-opacity-10 w-full ">
            <div className="flex gap-3 self-start items-center text-lg font-medium leading-6 whitespace-nowrap text-slate-800">
              <FaMedal size={20} color="#01AFF4" />
              <div className=" text-lg font-semi-bold font-spline text-[#2B383D]">
                Badges/Achievements
              </div>
            </div>
            <div className="shrink-0  mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
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
          <div className="flex flex-col  p-4  pl-3.5 bg-white rounded-md border border-solid border-black border-opacity-10 w-full ">
            <div>
              <div className="text-lg font-semi-bold font-spline text-[#2B383D]">
                <span className="flex items-center gap-3">
                  <MdTipsAndUpdates size={20} color="#01AFF4" />
                  Preparation Tips
                </span>
              </div>
              <div className="shrink-0  mt-3.5 h-px border border-solid bg-black bg-opacity-10 border-black border-opacity-10 max-md:max-w-full" />
              <div className="mt-3 px-2 text-sm leading-5 text-neutral-500">
                How to prepare for the upcoming session
              </div>
            </div>
            <div className="">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashBoard;
