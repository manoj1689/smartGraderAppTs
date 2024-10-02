import React, { useEffect, useState } from "react";
import {
  fetchQuestionSets,
  fetchSelectedItemId,
} from "../../../services/api/CategorySearchService";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import NotificationBar from "../../common/Notification/NotificationBar";
import { FiArrowUpRight } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { HiDotsVertical, HiDotsHorizontal } from "react-icons/hi";
import codingDev from "../../../assets/images/Individual/codingdeveloper.png";
import java from "../../../assets/images/Individual/javaLogo.png";
import noRecordFound from "../../../assets/images/Individual/NoRecordFound.png";
import { Card } from "../../../types/interfaces/interface";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  dropEllipsis,
  dropNav,
  combine,
} from "react-responsive-pagination/narrowBehaviour";
import { useNavigate } from "react-router-dom";
import CategorySearch from "../../common/CategorySearch/CategorySearch";
import QuestionView from "./QuestionView";
import Modal from "react-modal";
import { MdArrowOutward } from "react-icons/md";
Modal.setAppElement("#root");

const SelectSet: React.FC = () => {
  const navigate = useNavigate();
  const [matchingQuestionSets, setMatchingQuestionSets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [listOfAllId, setListOfAllId] = useState<number[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const getItemsPerPage = (width: number): number => {
    if (width < 640) return 2; // For sm screens
    if (width < 768) return 2; // For md screens
    if (width < 1024) return 4; // For lg screens
    if (width < 1280) return 6; // For xl screens
    if (width < 1520) return 6; // For 2xl screens
   
    return 8; // Default for large screens
  };


  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage(window.innerWidth));


  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const loadMatchingQuestionSets = async () => {
    const allSets = [];
    if (listOfAllId.length > 0) {
      for (const id of listOfAllId) {
        const SetsList = await fetchQuestionSets(id, 0, 0);
        allSets.push(...(SetsList || []));
      }
      setMatchingQuestionSets(allSets);
    } else {
      const SetsList = await fetchQuestionSets(0, 0, 0);
      setMatchingQuestionSets(SetsList);
    }
  };

  useEffect(() => {
    loadMatchingQuestionSets();
  }, [listOfAllId]);

  const handleCardClick = (id: string) => {
    setSelectedSetId(id);
  };

  const handleViewDetailsClick = () => {
    setIsModalOpen(true);
  };
  const continueWithSet = () => {
    console.log("Selected Question Set ID:", selectedSetId);
    navigate("/dashboard/createjobs", { state: { selectedSetId } });
  };


  const offset = currentPage * itemsPerPage; 
  const currentItems = matchingQuestionSets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(matchingQuestionSets.length / itemsPerPage);

  console.log("individal sent data", listOfAllId);

  return (
    <div className="container  mx-auto w-full h-full">
      <NotificationBar />

      <CategorySearch
          setListOfAllIds={setListOfAllId}
          setMatchingQuestionSets={setMatchingQuestionSets}
        />
      <div className="rounded-md border border-solid m-4 p-4 border-black border-opacity-10 bg-white shadow-md">
     
        {currentItems.length > 0 ? (
          <div className="flex w-full self-center ">
            <div className="px-4 grid mx-auto grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-10 ">
              {currentItems.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id.toString())}
                  className={`flex flex-col   justify-between  px-3 py-6 font-light rounded-md border cursor-pointer border-sky-200  hover:border-gray-500  border-solid text-neutral-500 ${
                    selectedSetId === card.id.toString() ? "border-sky-300 bg-sky-200 scale-105" : "bg-white"
                  }`}
                >
                  <div className="flex bg-white  p-2 rounded-md justify-center">
                    <img
                      loading="lazy"
                      src={codingDev}
                      alt={card.title}
                      className="w-20 h-20"
                    />

                  </div>
                  <div className="flex w-full  justify-between items-center gap-2  ">
                            <div className="px-3 py-1 text-sm text-gray-500 border border-gray-500 rounded-md">
                              Frontend
                            </div>
                            <div className="flex  justify-center items-center py-2 gap-2">
                              <div className="">
                                <img
                                  loading="lazy"
                                  alt="java"
                                  src={java}
                                  className="w-12 h-12"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 items-center ">
                            <div className="flex justify-between items-center  gap-5">
                              <div className="text-md font-medium text-gray-500">
                                SmartGrader
                              </div>
                            </div>
                            <Rating style={{ maxWidth: 100 }} value={4} />
                          </div>
                  <div className="flex flex-col">
                    <div className="flex mt-2.5 w-72 text-lg font-medium leading-5 text-gray-800">
                      <div className="flex w-full">
                      {card.title}
                        </div>
                       
                      
                    </div>

                    <div className="flex gap-5 mt-3 justify-between items-center px-0.5 text-sm leading-5">
                      <div className="flex gap-5 flex-row">
                        <div className="flex gap-1">
                          <div className="flex justify-center items-center">
                            <CiClock2 size={14} color="#01AFF4" />
                          </div>
                          <div className="text-md">{card.duration} Min</div>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex justify-center items-center">
                            <IoHelpCircleOutline size={14} color="#01AFF4" />
                          </div>
                          <div className="text-md">{card.questions_count} Questions</div>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <img
              src={noRecordFound}
              className="mx-auto w-96"
              alt="No Matching Data"
            />
          </div>
        )}
        <div className="mt-5 sm:w-3/5 mx-auto">
          <ResponsivePagination
            narrowBehaviour={combine(dropNav, dropEllipsis)}
            current={currentPage + 1}
            total={pageCount}
            onPageChange={(page) => setCurrentPage(page - 1)}
          />
        </div>
        <div className="flex flex-col xl:w-4/5 gap-5 px-4 lg:flex-row justify-center mx-auto">
          <button
            className="flex justify-center items-center self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full max-md:px-5"
            onClick={continueWithSet}
          >
            <div className="flex gap-2.5">
              <div className="flex items-center gap-3">
                <span>Continue With This Question Set</span>
                <span>
                  <MdArrowOutward />
                </span>
              </div>
            </div>
          </button>
          <button
            className="flex justify-center items-center mx-auto self-stretch px-4 py-5 mt-10 text-red-500 bg-white rounded-md border border-gray-400 w-full max-md:px-5"
            onClick={handleViewDetailsClick}
          >
            <div className="flex gap-2.5">
              <div className="flex items-center gap-3">
                <span>View Question Set Details</span>
                <span>
                  <MdArrowOutward />
                </span>
              </div>
            </div>
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setSelectedSetId(""); // Reset selectedSetId when modal is closed
          }}
          contentLabel="Question Page Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Add an overlay with some transparency
              zIndex: 20, // Set a higher z-index for the overlay
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              zIndex: 21, // Set a higher z-index for the modal content
              position: "absolute",
              maxHeight: "80%", // Set a maximum height for the modal content
              overflowY: "auto", // Enable vertical scrolling when content exceeds the height
              transform: "translate(-50%, -50%)",
              width: "80%", // Set width as needed
              // maxWidth: '500px', // Set maximum width if needed
            },
          }}
        >
          <QuestionView cardId={selectedSetId} />
        </Modal>
      </div>
    </div>
  );
};

export default SelectSet;
