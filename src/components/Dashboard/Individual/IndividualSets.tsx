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

const IndividualSets: React.FC = () => {
  const navigate = useNavigate();
  const [matchingQuestionSets, setMatchingQuestionSets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [listOfAllId, setListOfAllId] = useState<number[]>([]);

  const getItemsPerPage = (width: number): number => {
    if (width < 648) return 4; // For small screens
    if (width < 768) return 6; // For medium screens
    if (width < 1024) return 6; // For small screens
    if (width < 1280) return 6; 
    if (width < 1536) return 9; 
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
        <div className="mt-3 flex justify-start flex-wrap xl:gap-5 2xl:gap-3">
          {currentItems.map((card) => (
            <div className="flex flex-col my-3 p-4 h-2/5 rounded-md border border-solid border-black border-opacity-10 shadow-md hover:shadow-lg hover:border-slate-800 transition duration-300 ease-in-out max-sm:w-80 sm:w-72 md:w-80 lg:w-80 xl:w-72  max-xl:mx-auto bg-white font-light text-neutral-500 cursor-pointer" key={card.id}>
              <div className="flex flex-col justify-start text-xs leading-6 whitespace-nowrap bg-sky-50 rounded-md">
                <div className="flex overflow-hidden relative flex-col pt-4 pb-1 w-full aspect-w-1 aspect-h-1">
                  <div className="flex flex-row w-full justify-around">
                    <img loading="lazy" src={java} alt={card.image_url} className="w-20 h-20" />
                    <img loading="lazy" alt="Coding" src={codingDev} className="self-end aspect-square w-12" />
                  </div>
                  <div className="flex relative gap-1 py-1.5 mt-3 bg-white rounded-sm shadow-sm">
                    <img loading="lazy" alt="star" src={star} className="shrink-0 aspect-[1.09] fill-amber-400 w-[17px] h-[17px]" />
                    <div className="flex-auto">{card.rating}/5</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-between mt-4">
                <div className="flex gap-1 text-sm leading-4">
                  <img loading="lazy" alt="grader" src={graderLogo} className="shrink-0 aspect-[1.27] w-[30px]" />
                  <div className="my-auto">{card.title}</div>
                </div>
                <div className="justify-center px-2 py-1 my-auto text-xs leading-4 whitespace-nowrap bg-sky-50 rounded-md border border-solid border-neutral-500">
                  {card.level}
                </div>
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-800">
                {card.description}
              </div>
              <div className="flex gap-2 self-start mt-2 text-xs leading-5">
                <div className="flex gap-1">
                  <div className="flex justify-center items-center ">
                    <CiClock2 size={14} color="#01AFF4" />
                  </div>
                  <div>{card.duration} Min</div>
                </div>
                <div className="flex gap-1">
                  <div className="flex justify-center items-center ">
                    <IoHelpCircleOutline size={14} color="#01AFF4" />
                  </div>
                  <div>{card.questions_count} Questions</div>
                </div>
              </div>
              <button className="flex items-center justify-center px-3 py-3 mt-4 text-xs text-white bg-sky-500 rounded border border-sky-500 border-solid hover:bg-slate-800 hover:border-slate-800" onClick={(e) => { e.stopPropagation(); handleCardClick(card); }}>
                <div className="flex flex-row items-center gap-2">
                  <div>Take a Test</div>
                  <div>
                    <FiArrowUpRight size={15} />
                  </div>
                </div>
              </button>
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
    </div>
  );
};

export default IndividualSets;
