import React, { useEffect, useState } from 'react';
import { fetchQuestionSets, fetchSelectedItemId } from '../../../services/api/CategorySearchService';
import ResponsivePagination from 'react-responsive-pagination';
import "react-responsive-pagination/themes/classic.css";
import NotificationBar from '../../common/Notification/NotificationBar';
import { FiArrowUpRight } from 'react-icons/fi';
import { CiClock2 } from 'react-icons/ci';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { HiDotsVertical, HiDotsHorizontal } from "react-icons/hi";
import codingDev from '../../../assets/images/Individual/codingdeveloper.png';
import star from '../../../assets/images/Individual/Star.png';
import java from '../../../assets/images/Individual/javaLogo.png';
import noRecordFound from '../../../assets/images/Individual/NoRecordFound.png';
import { Card } from '../../../types/interfaces/interface';
import { dropEllipsis, dropNav, combine } from 'react-responsive-pagination/narrowBehaviour';
import { useNavigate } from 'react-router-dom';
import CategorySearch from '../../common/CategorySearch/CategorySearch';
import QuestionView from "./QuestionView";
import Modal from "react-modal"; 
import { MdArrowOutward } from "react-icons/md";
Modal.setAppElement("#root");

const SelectSet: React.FC = () => {
  const navigate = useNavigate();
  const [matchingQuestionSets, setMatchingQuestionSets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const [listOfAllId, setListOfAllId] = useState<number[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
 const continueWithSet=()=>{
  
  console.log("Selected Question Set ID:", selectedSetId)
  navigate('/dashboard/createjobs',{state:{selectedSetId}})
 }
  const offset = currentPage * itemsPerPage;
  const currentItems = matchingQuestionSets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(matchingQuestionSets.length / itemsPerPage);

  console.log("individal sent data", listOfAllId);

  return (
    <div className="container mx-auto w-full h-full px-4 my-4 md:px-10">
      <NotificationBar />

      <div className="rounded-md border border-solid my-5 py-10 border-black border-opacity-10">
        <CategorySearch setListOfAllIds={setListOfAllId} setMatchingQuestionSets={setMatchingQuestionSets} />
        {currentItems.length > 0 ? (
          <div className="flex flex-wrap max-lg:justify-center max-lg:align-center gap-2 px-5 py-10 mt-10">
            {currentItems.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id.toString())}
                className={`flex justify-between px-3 py-6 font-light rounded-md border border-sky-500 border-solid text-neutral-500 ${selectedSetId === card.id.toString() ? "bg-blue-200" : ""}`}
              >
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="flex justify-center">
                    <img
                      loading="lazy"
                      src={codingDev}
                      alt={card.title}
                      className="w-20 h-20"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex gap-1 self-start py-1.5 text-xs leading-4 whitespace-nowrap rounded-sm shadow-sm">
                      <img
                        loading="lazy"
                        alt="star"
                        src={star}
                        className="shrink-0 aspect-[1.09] fill-amber-400 w-[17px] h-[17px]"
                      />
                      <div className="flex-auto">{card.rating}/5</div>
                    </div>
                    <div className="flex mt-2.5 w-72 text-lg leading-4 text-slate-800">
                      <div className="flex">
                        <div>{card.title}</div>
                        <img
                          loading="lazy"
                          alt="java"
                          src={java}
                          className="shrink-0 aspect-[1.09] ml-5 w-[30px] h-[30px]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 mt-3 items-center px-0.5 text-sm leading-5">
                      <div className="flex flex-col gap-1 lg:flex-row">
                        <div className="flex gap-1">
                          <div className="flex justify-center items-center">
                            <CiClock2 size={14} color="#01AFF4" />
                          </div>
                          <div>{card.duration} Min</div>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex justify-center items-center">
                            <IoHelpCircleOutline size={14} color="#01AFF4" />
                          </div>
                          <div>{card.questions_count} Questions</div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center self-stretch px-2.5 py-1 text-xs leading-4 whitespace-nowrap bg-sky-50 rounded-md border border-solid border-neutral-500">
                        Frontend
                      </div>
                      <div className="flex justify-center w-[25px] lg:hidden items-center">
                        <HiDotsVertical size={40} />
                      </div>
                    </div>
                  </div>
                  <div className="flex max-lg:hidden justify-center items-center">
                    <HiDotsHorizontal size={40} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <img src={noRecordFound} className="mx-auto w-96" alt="No Matching Data" />
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
        <div className="flex flex-col lg:w-2/3 gap-5 lg:flex-row justify-center mx-auto">
          <button
            className="flex justify-center items-center self-stretch mx-auto px-4 py-5 mt-10 text-base text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full max-md:px-5"
            onClick={continueWithSet}
          >
            <div className="flex gap-2.5">
              <div className="flex items-center gap-3">
                <span >Continue With This Question Set</span>
                <span><MdArrowOutward /></span>
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
                <span><MdArrowOutward /></span>
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
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Add an overlay with some transparency
              zIndex: 20, // Set a higher z-index for the overlay
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              zIndex: 21, // Set a higher z-index for the modal content
              position: 'absolute',
              maxHeight: '80%', // Set a maximum height for the modal content
              overflowY: 'auto', // Enable vertical scrolling when content exceeds the height
              transform: 'translate(-50%, -50%)',
              width: '80%', // Set width as needed
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
