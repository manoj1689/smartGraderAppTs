import React, { useEffect, useState } from 'react';
import { fetchQuestionSets, fetchSelectedItemId } from '../../../services/api/CategorySearchService';
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

interface Category {
    id: number;
    name: string;
  }
  


const OrganisationCardDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [matchingQuestionSets, setMatchingQuestionSets] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [listOfAllId, setListOfAllId] = useState<number[]>([]);
  const [cardId, setCardId] = useState<string>("");
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

//   const handleCardClick = (interview: any) => {
//     navigate(`/dashboard/question/${interview.id}/instructions`, {
//       state: { interview },
//     });
//   };
  const handleCardClick = (id: string) => {
    setCardId(id);
   // setIsModalOpen(true); // Open modal when card is clicked
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = matchingQuestionSets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(matchingQuestionSets.length / itemsPerPage);
 console.log("individal sent data",listOfAllId)
  return (
    <div>
         <CategorySearch setListOfAllIds={setListOfAllId} setMatchingQuestionSets={setMatchingQuestionSets} />
    {currentItems.length > 0 ? (
       <div className="flex flex-wrap max-lg:justify-center max-lg:align-center gap-2 px-5 py-10 mt-10">
       {currentItems.map((card) => (
         <div
           key={card.id}
           onClick={(e) => {
             e.stopPropagation();
             handleCardClick(card.id);
           }}
           className={`flex flex-row rounded-md border border-solid border-black border-opacity-10 shadow-md hover:shadow-lg hover:border-slate-800 transition duration-300 ease-in-out font-light text-neutral-500 cursor-pointer ${
             cardId === card.id ? "bg-sky-200" : "bg-sky-50"
           }`}
         >
           <div className="flex justify-between px-3 py-6 font-light rounded-md border border-sky-500 border-solid text-neutral-500 ">
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
                 <div className="flex mt-2.5 w-72 text-lg leading-4  text-slate-800">
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
         </div>
       ))}
     </div>
    ) : (
      <>
        <div>
          
          <img src={noRecordFound} className=" mx-auto w-96" alt="No Matching Data" />
           </div>
      </>
    )}
    <div className=" mt-5 sm:w-3/5 mx-auto">
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

export default OrganisationCardDisplay;