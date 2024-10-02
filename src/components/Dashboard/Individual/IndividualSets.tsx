import React, { useEffect, useState } from 'react';
import { fetchQuestionSets } from '../../../services/api/CategorySearchService';
import ResponsivePagination from 'react-responsive-pagination';
import "react-responsive-pagination/themes/classic.css";
import { FiArrowUpRight } from 'react-icons/fi';
import { CiClock2 } from 'react-icons/ci';
import { IoHelpCircleOutline } from 'react-icons/io5';
import codingDev from '../../../assets/images/Individual/codingdeveloper.png';
import star from '../../../assets/images/Individual/Star.png';
import graderLogo from '../../../assets/images/Individual/graderIcon.png';
import java from '../../../assets/images/Individual/javaLogo.png';
import noRecordFound from '../../../assets/images/Individual/NoRecordFound.png';
import { Card } from '../../../types/interfaces/interface';
import { dropEllipsis, dropNav, combine } from 'react-responsive-pagination/narrowBehaviour';
import { useNavigate } from 'react-router-dom';
import CategorySearch from '../../common/CategorySearch/CategorySearch';
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const IndividualSets: React.FC = () => {
  const navigate = useNavigate();
  const [matchingQuestionSets, setMatchingQuestionSets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [listOfAllId, setListOfAllId] = useState<number[]>([]);

  const getItemsPerPage = (width: number): number => {
    if (width < 640) return 4; // For sm screens
    if (width < 768) return 4; // For md screens
    if (width < 1024) return 6; // For lg screens
    if (width < 1280) return 9; // For xl screens
    if (width < 1600) return 8; // For 2xl screens
   
    return 10; // Default for large screens
  };

  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage(window.innerWidth));

  const loadMatchingQuestionSets = async () => {
    const allSets: Card[] = [];
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

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (interview: Card) => {
    navigate(`/dashboard/question/${interview.id}/instructions`, {
      state: { interview },
    });
  };

  const offset = currentPage * itemsPerPage; 
  const currentItems = matchingQuestionSets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(matchingQuestionSets.length / itemsPerPage);
  
  return (
    <div>
      <CategorySearch setListOfAllIds={setListOfAllId} setMatchingQuestionSets={setMatchingQuestionSets} />
      {currentItems.length > 0 ? (
        <div className="mt-8 justify-center ">
          <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-10 xl:gap-5 ">
            {currentItems.map((card) => (
            <div
            className="flex flex-col my-2 p-4 mx-auto max-lg:w-72 w-full rounded-lg border border-violet-200 hover:border-gray-700 shadow-lg transition-transform transform hover:scale-105 duration-300 bg-white text-neutral-700"
            key={card.id}
          >
            <div className="flex flex-col justify-center items-center   rounded-lg shadow-sm">
              <div className="flex bg-white w-full p-2 justify-center rounded ">
                <img
                  loading="lazy"
                  alt="Coding"
                  src={codingDev}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
              <div className="flex w-full  justify-between items-center gap-2   ">
              <div className="px-3 py-1 text-sm text-gray-500 border border-gray-500 rounded-md">
                Frontend
              </div>
                <div className='flex  justify-center items-center py-2 gap-2'>
                {/* <img
                  loading="lazy"
                  alt="star"
                  src={star}
                  className="w-5 h-5 text-yellow-500"
                />
                <span className="text-base pt-1 font-medium text-gray-900">{card.rating}/5</span> */}
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
              
            </div>
          
            <div className="flex justify-between mt-2 items-center ">
              <div className="flex items-center  gap-2">
                {/* <img
                  loading="lazy"
                  alt="grader"
                  src={graderLogo}
                  className="w-10 h-8 rounded-md border border-gray-300 bg-sky-300 p-1  shadow-sm"
                /> */}
                <div className="text-md font-medium text-gray-500">SmartGrader</div>
              </div>
              <Rating style={{ maxWidth: 100 }} value={4} />
            </div>
          
            <h3 className="py-2 text-lg font-medium font-spline text-slate-700">{card.title}</h3>
          
            <div className="flex justify-start items-center gap-4  text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CiClock2 size={18} color="#01AFF4" />
                <span>{card.duration} Min</span>
              </div>
              <div className="flex items-center gap-1">
                <IoHelpCircleOutline size={18} color="#01AFF4" />
                <span>{card.questions_count} Questions</span>
              </div>
            </div>
          
            <button
              className="flex items-center justify-center px-4 py-3 mt-5 text-sm text-white bg-sky-500 rounded shadow hover:bg-slate-800 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(card);
              }}
            >
              <span>Take a Test</span>
              <FiArrowUpRight size={18} className="ml-2" />
            </button>
          </div>
          
            ))}
          </div>
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
    </div>
  );
};

export default IndividualSets;
