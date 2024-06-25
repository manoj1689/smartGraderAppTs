import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  fetchQuestionSets,
} from "../../../services/api/CategorySearchService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import codingDev from "../../../assets/images/Individual/codingdeveloper.png";
import star from "../../../assets/images/Individual/Star.png";
import graderLogo from "../../../assets/images/Individual/graderIcon.png";
import java from "../../../assets/images/Individual/javaLogo.png";
import { FiArrowUpRight } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Card } from "../../../types/interfaces/interface";
// import './index.css';

interface Category {
  id: number;
  name: string;
  parent_id?: number | null;
  subcategories?: Record<string, Category>;
}

const CategorySearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState<
    Record<string, Category>
  >({});
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [matchingQuestionSets, setMatchingQuestionSets] = useState<Card[]>([]);
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategoriesData(categories);
      console.log("Fetched and transformed categories:", categories);
    };

    fetchData();
  }, []);
  console.log("matching set recieved on categorySearch", matchingQuestionSets);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredSuggestions(filterCategories(categoriesData, term));
  };

  const handleItemClick = async (item: string, level: number) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      newSelectedItems[level] = item;
      return newSelectedItems.slice(0, level + 1);
    });

    const path = selectedItems.slice(0, level + 1).join(" > ");
    const selectedCategory = findCategory(
      categoriesData,
      selectedItems.slice(0, level + 1)
    );
    console.log("Selected category:", selectedCategory);

    const itemHasChildren =
      selectedCategory &&
      selectedCategory.subcategories &&
      Object.keys(selectedCategory.subcategories).length > 0;
    console.log("Item has children:", itemHasChildren);

    if (!itemHasChildren) {
      setIsMenuOpen(false);

      // await fetchQuestionSets(path); // Pass the selected path to fetchQuestionSets
    }
  };
  console.log("the suggestionlistSelect", selectedItems);
  if (selectedItems.length > 0) {
    fetchQuestionSets(selectedItems);
  }
  useEffect(() => {
    const loadMatchingQuestionSets = async () => {
      if (selectedItems.length >= 0) {
        const matchingSets = await fetchQuestionSets(selectedItems);
        setMatchingQuestionSets(matchingSets || []);
      } else {
        setMatchingQuestionSets([]);
      }
    };

    loadMatchingQuestionSets();
  }, [selectedItems]);

  const findCategory = (
    categories: Record<string, Category>,
    path: string[]
  ): Category | null => {
    let currentCategory: Category | undefined = undefined;
    let currentCategories: Record<string, Category> | undefined = categories;

    for (const segment of path) {
      if (currentCategories && currentCategories[segment]) {
        currentCategory = currentCategories[segment];
        currentCategories = currentCategory.subcategories;
      } else {
        return null;
      }
    }

    return currentCategory || null;
  };

  const filterCategories = (
    categories: Record<string, Category>,
    term: string
  ): string[] => {
    const results: string[] = [];
    if (!term) return results;

    const traverse = (categories: Record<string, Category>, path: string) => {
      Object.keys(categories).forEach((key) => {
        const subcategories = categories[key].subcategories;
        const currentPath = path ? `${path} > ${key}` : key;
        if (key.toLowerCase().includes(term)) {
          results.push(currentPath);
        }
        if (subcategories && typeof subcategories === "object") {
          traverse(subcategories, currentPath);
        }
      });
    };

    traverse(categories, "");
    return results;
  };

  const renderSubcategories = (
    subcategories: Record<string, Category>,
    level: number
  ) => {
    if (!selectedItems[level - 1] && !searchTerm) return null;

    return Object.keys(subcategories).map((subcategory, index) => (
      <div key={index} className="relative group">
        <a
          href="#"
          className={`block px-4 py-2 text-sm ${
            selectedItems[level] === subcategory
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleItemClick(subcategory, level)}
        >
          {subcategory}
        </a>
        {subcategories[subcategory].subcategories &&
          Object.keys(subcategories[subcategory].subcategories!).length > 0 &&
          selectedItems[level] === subcategory && (
            <div className="absolute left-full top-0 hidden mt-1 group-hover:block">
              <div className="w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                {renderSubcategories(
                  subcategories[subcategory].subcategories!,
                  level + 1
                )}
              </div>
            </div>
          )}
      </div>
    ));
  };

  const renderCategories = (
    categories: Record<string, Category>,
    level: number = 0
  ) => {
    return Object.keys(categories).map((mainCategory) => {
      const subcategories = categories[mainCategory].subcategories;
      return (
        <div key={mainCategory} className="relative group">
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
              selectedItems[level] === mainCategory
                ? "text-blue-500"
                : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => handleItemClick(mainCategory, level)}
          >
            {mainCategory}
          </button>
          {selectedItems[level] === mainCategory && (
            <div className="absolute hidden pt-1 group-hover:block z-10">
              <div className="w-48 bg-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                {renderSubcategories(subcategories!, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const handleCardClick = (interview: any) => {
    navigate(`/dashboard/question/${interview.id}/instructions`, {
      state: { interview },
    });
  };
  const handleSuggestionClick = async (suggestion: string) => {
    const pathItems = suggestion.split(" > ");
    pathItems.forEach((item, level) => handleItemClick(item, level));
    setSearchTerm("");
    setFilteredSuggestions([]);
  };
  console.log(matchingQuestionSets);
  return (
    <div className="container mx-auto px-4" ref={menuRef}>
      <header>
        <div className="flex justify-between items-center">
          {/* <h1 className="text-3xl font-bold font-spline">Category Menu</h1> */}
          <button
            className="block lg:hidden text-gray-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              ></path>
            </svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Search categories..."
          className="justify-center items-start p-4  leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredSuggestions.length > 0 && (
          <div className="absolute bg-blue-100 shadow-lg max-h-[] overflow-y-scroll scroll-smooth rounded-md w-3/4 sm:w-2/3 mt-4 z-10">
            <ul className="p-3">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-blue-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <nav
        className={`flex flex-wrap lg:flex-nowrap font-spline space-x-4 ${
          isMenuOpen ? "" : "hidden lg:flex"
        }`}
      >
        {renderCategories(categoriesData)}
      </nav>
      {/* {selectedItems.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Selected Path</h2>
          <ul className="list-disc pl-5">
            {selectedItems.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      )} */}
      <div>
        {matchingQuestionSets.length > 0 && (
          <div className="mt-5">
           
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              arrows={false}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              className="container py-5"
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
              itemClass="carousel-item-padding-20-px "
            >
              {matchingQuestionSets.map((card) => (
                <div className="flex flex-col p-4  mx-4  rounded-md border border-solid border-black border-opacity-10 shadow-md hover:shadow-lg hover:border-slate-800 transition duration-300 ease-in-out bg-white font-light text-neutral-500 cursor-pointer">
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
                    <div
                      className="flex flex-row items-center gap-2"
                      key={card.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                    >
                      <div>Take a Test</div>
                      <div>
                        <FiArrowUpRight size={15} />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySearch;
