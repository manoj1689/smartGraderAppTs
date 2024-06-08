import { useState, useEffect, useRef } from "react";
import {useNavigate } from "react-router-dom";
import codingDev from "../../../assets/images/individual/codingdeveloper.png";
import star from "../../../assets/images/individual/Star.png";
import graderLogo from "../../../assets/images/individual/graderIcon.png";
import womanCheck from "../../../assets/images/individual/woman-plan-todo-list.png";
import java from "../../../assets/images/individual/javaLogo.png";
import achievement from "../../../assets/images/individual/certificateAchievements.png";
import interView from "../../../assets/images/individual/job-interview.png";
import LineScoreCard from "./LineScoreCard";
import CircleScoreCard from "./CircleScoreCard";
import { FiArrowUpRight } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
 import NotificationBar from "../../common/Notification/NotificationBar";
import {
  fetchData, // Importing the new fetchData function
  fetchSearchResults,
} from "../../../services/api/IndividaulDataService";
import { Category,Card } from "../../../types/interfaces/interface";
function IndividualDashBoard() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchList, setSearchList] = useState<Category[]>([]);
  const [query, setQuery] = useState<string>("");
  const prevQueryRef = useRef<string>("");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1264 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem("accessToken") || "";
      const { categoriesData, cardsData } = await fetchData(1, 11, token, selectedCategories);
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
  const toggleCategory = (category:any) => {
    if (selectedCategories.includes(category.name)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category.name)
      );
    } else {
      setSelectedCategories([...selectedCategories, category.name]);
    }
  };
  //  console.log("categories Data top Bar",selectedCategories)

  const handleCardClick = (id:number) => {
    navigate(`/dashboard/question/${id}`);
  };
  const handleOnSearch = (string:any, results:any) => {
    setQuery(string); // Set the query state with the searched string
  };

  const handleOnHover = (result:any) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item:any) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item:any) => {
    return (
      <>
        {/*<span style={{ display: 'block', textAlign: 'left' }}>id: {item.name}</span> */}
        <span
          style={{ display: "block", textAlign: "left", cursor: "pointer" }}
        >
          {item.name}
        </span>
      </>
    );
  };
  return (
    <div className="container mx-auto w-full h-full px-4 md:px-10 ">
       <NotificationBar/> 

     <div className="rounded-md border border-solid my-5 py-10 border-black border-opacity-10 ">
       
       <div className=" flex justify-end items-center">
           <div className="md:mb-0 px-4 sm:w-[350px] max-sm:w-full">
             <ReactSearchAutocomplete
               items={searchList}
               onSearch={handleOnSearch}
               onHover={handleOnHover}
               onSelect={handleOnSelect}
               onFocus={handleOnFocus}
               autoFocus
               formatResult={formatResult}
               styling={{ border: "1.5px solid #C0C0C0", borderRadius: "5px" ,zIndex:"40" }}
             />
           </div>
         </div>
      
         <div className="container mx-auto lg:w-11/12">
           <Carousel
             swipeable={true}
             draggable={false}
             showDots={false}
             responsive={responsive}
             ssr={true}
             infinite={true}
             autoPlaySpeed={1000}
             keyBoardControl={true}
             customTransition="all .5"
             transitionDuration={500}
             className="container  py-5"
             customLeftArrow={
               <div className="absolute z-10 left-1 bg-gray-400 bg-opacity-60 px-3 py-3 rounded-full">
                 <FaChevronLeft className="max-w-6 cursor-pointer text-primary-300" />
               </div>
             }
             customRightArrow={
               <div className="absolute z-10 right-1 bg-gray-400 bg-opacity-60 px-3 py-3 rounded-full">
                 <FaChevronRight className="max-w-6 cursor-pointer text-primary-300" />
               </div>
             }
             dotListClass="custom-dot-list-style"
             itemClass="carousel-item-padding-20-px  "
           >
             {categories.map((category) => (
               <div
                 key={category.id}
                 onClick={() => toggleCategory(category)}
                 className={`flex justify-center align-center text-sm py-2 mx-2 border border-solid border-neutral-500 rounded-[30px] cursor-pointer ${
                   selectedCategories.includes(category.name)
                     ? "text-sky-500 bg-sky-50 border-sky-500"
                     : "border-neutral-500"
                 }`}
               >
                 {category.name}
               </div>
             ))}
           </Carousel>
         </div>
       
       
 

       <div className="flex flex-wrap max-lg:justify-center max-lg:align-center gap-4 px-10 py-10 mt-10">
         {cardsData.map((card) => (
           <div
             key={card.id}
             onClick={(e) => {
               e.stopPropagation();
               handleCardClick(card.id);
             }}
             className="flex flex-col p-4 h-2/5 bg-white rounded-md border border-solid border-black border-opacity-10 shadow-md hover:shadow-lg hover:border-slate-800 transition duration-300 ease-in-out w-64 font-light text-neutral-500 cursor-pointer"
           >
             <div className="flex flex-col justify-center text-xs leading-6 whitespace-nowrap bg-sky-50 rounded-md">
               <div className="flex overflow-hidden relative flex-col pt-4 pb-1 w-full aspect-w-1 aspect-h-1">
                 <div className="flex flex-row w-full justify-around">
                   <img
                     loading="lazy"
                     src={java}
                     alt={card.title}
                     className="w-20 h-20"
                   />
                   <img
                     loading="lazy"
                     alt="Coding"
                     src={codingDev}
                     className="self-end aspect-square w-12"
                   />
                 </div>

                 <div className="flex relative gap-1 py-1.5 mt-3 bg-white rounded-sm shadow-sm">
                   <img
                     loading="lazy"
                     alt="star"
                     src={star}
                     className="shrink-0 aspect-[1.09] fill-amber-400 w-[17px] h-[17px]"
                   />
                   <div className="flex-auto">{card.rating}/5</div>
                 </div>
               </div>
             </div>
             <div className="flex gap-2 justify-between mt-4">
               <div className="flex gap-1 text-sm leading-4">
                 <img
                   loading="lazy"
                   alt="grader"
                   src={graderLogo}
                   className="shrink-0 aspect-[1.27] w-[30px]"
                 />
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
             <button className="flex items-center justify-center px-3 py-2 mt-4 text-xs text-white bg-sky-500 rounded-md border border-sky-500 border-solid hover:bg-slate-800 hover:border-slate-800">
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
     </div>

     <div className="pt-5 my-10  pl-8 bg-white rounded-md border border-solid border-black border-opacity-10 max-md:pl-5">
       <div className="flex flex-col md:flex-row ">
         <div className="md:basis-2/3 justify-center items-center  flex flex-col xl:flex-row  gap-5  max-md:gap-0">
           <div className="  flex flex-col sm:flex-row ">
             <div>
               <div className="font-medium  text-slate-800">
                 Set Your Own Questions{" "}
               </div>

               <div className="flex flex-col md:flex-row ">
                 <div className=" flex flex-col self-stretch my-auto text-lg font-light leading-6 text-neutral-500 ">
                   <div className="flex gap-2.5 mt-7">
                     <IoCheckmark size={28} color="#01AFF4" />
                     <div className="flex-auto my-auto">
                       Create by Selecting Domain
                     </div>
                   </div>
                   <div className="flex gap-2.5 mt-1.5">
                     <IoCheckmark size={28} color="#01AFF4" />
                     <div className="flex-auto my-auto">
                       Create by Writing JD
                     </div>
                   </div>
                 </div>
                 <div className="flex flex-col ml-5  max-md:ml-0 max-md:w-full ">
                   <div className="flex flex-col self-stretch my-auto text-lg font-light leading-6 text-neutral-500 ">
                     <div className="flex gap-2.5 mt-7">
                       <IoCheckmark size={28} color="#01AFF4" />
                       <div className="flex-auto my-auto">
                         Create by Resume Uploading
                       </div>
                     </div>
                     <div className="flex gap-2.5 mt-1.5">
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
               onClick={() => navigate("/dashboard/generatequestion")}
               type="button"
               className="flex flex-row items-center justify-center bg-blue-400 w-50 md:w-60 my-5 text-white px-4 py-2 mt-4 rounded-sm hover:bg-blue-500 transition duration-300"
             >
               <span className="mr-2">Let's Get Started</span>
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
     <div className="flex flex-col mb-10 md:flex-row gap-3  max-md:flex-col max-md:gap-0">
       <div
         className="w-full md:w-1/2 cursor-pointer"
         onClick={() => navigate("/dashboard/result")}
       >
         <LineScoreCard />
       </div>
       <div className="w-full md:w-1/2 ">
         <CircleScoreCard />
       </div>
     </div>
     <div className="my-10 flex flex-col lg:flex-row gap-3">
       <div className="flex flex-col md:flex-row gap-3  lg:w-1/2">
       <div className="flex flex-col  py-8 pr-7 pl-3.5 bg-white  border border-solid border-black border-opacity-10 w-full ">
         <div className="flex gap-1.5 self-start text-lg font-medium leading-6 whitespace-nowrap text-slate-800">
           <img
             loading="lazy"
             alt="achievement"
             src={achievement}
             className="shrink-0 aspect-square w-[26px]"
           />
           <div className="flex-auto my-auto">Badges/Achievements</div>
         </div>
         <div className="shrink-0 mt-4 ml-3.5 w-full h-px  rounded-md border border-solid border-black border-opacity-10" />
         <img
           loading="lazy"
           src="https://cdn.builder.io/api/v1/image/assets/TEMP/4212c04f5674154ed14d0742e085f4c32dc5f61d0f32992d5833690ac2b6ce6f?"
           className="mt-2.5 max-w-full aspect-[1.33] w-[109px]"
         />
         <div className="ml-5 text-sm leading-5 text-neutral-500">
           Entry Level
         </div>
       </div>
       <div className="flex flex-col  justify-center font-light  rounded-md border border-solid border-black border-opacity-10 w-full ">
       <div className="flex overflow-hidden bg-white relative flex-col items-start  lg:p-2.5 w-full aspect-[2]    md:aspect-[1.28] ">
 <img
   loading="lazy"
   alt="interview"
   src={interView}
   className="absolute bottom-0 right-0 object-cover "
 />
 <div className="relative text-lg px-2 font-medium leading-6 text-slate-800">
   <br />
   Preparation
   <br />
   Tips
 </div>
 <div className="relative mt-3  px-2  text-sm leading-5 text-neutral-500">
   How to prepare <br />
   for the upcoming session
 </div>
 <div className="relative mt-3.5  px-2  text-xs leading-4 text-sky-500 underline">
   Read More
 </div>
</div>

   </div>

       </div>
     
   <div className="flex flex-col px-6 py-8 bg-white rounded-md border border-solid border-black border-opacity-10 lg:w-1/2 max-md:px-5">
     <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
       <div className="flex gap-1.5 self-start text-lg font-medium leading-6 text-slate-800">
         <img
           loading="lazy"
           src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e11f9e3c86ac0afbffedab4ee00ede66e4d93d01723eee11339e11c2b3652f6?"
           className="shrink-0 aspect-square w-[26px]"
         />
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
         src="https://cdn.builder.io/api/v1/image/assets/TEMP/2921a7134b0e918d2a777773b8d4a89b1372d9bda49d35dd22a64ca69e31f87c?"
         className="shrink-0 w-24 aspect-[4.76]"
       />
       <div className="flex-auto my-auto max-sm:text-sm">Frond End Developer</div>
     </div>
     <div className=" mt-2 text-base font-light leading-5 text-neutral-500  ">
       <ul className="my-5">
         <li className="my-3">
         Candidate excellent on technical skills but have to
       improve communications skills.
         </li>
         <li className="my-3">
         All other have good command on code.{" "}
         </li>
         
       </ul>
     
     </div>
   </div>
     </div>
   </div>
  );
}

export default IndividualDashBoard;
