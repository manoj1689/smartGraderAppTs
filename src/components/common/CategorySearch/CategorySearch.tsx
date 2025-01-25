import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import {
  fetchCategories,
  fetchSelectedItemId,
  fetchQuestionSets,
} from "../../../services/api/CategorySearchService";
import { Card } from "../../../types/interfaces/interface";

interface Category {
  id: number;
  name: string;
  parent_id?: number | null;
  subcategories?: Record<string, Category>;
}
interface CategorySearchProps {
  setListOfAllIds: (ids: number[]) => void;
  setMatchingQuestionSets: (cards: Card[]) => void; 
}
const CategorySearch: React.FC<CategorySearchProps> = ({
  setListOfAllIds,
  setMatchingQuestionSets,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [categoriesData, setCategoriesData] = useState<
    Record<string, Category>
  >({});
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategoriesData(categories);
     // console.log("Fetched and transformed categories:", categories);
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const loadMatchingQuestionSetsIds = async () => {
      if (selectedItems && selectedItems.length > 0) {
        const ListOfAllIds: any = await fetchSelectedItemId(selectedItems);
        setListOfAllIds(ListOfAllIds);
      }
    };
  
    loadMatchingQuestionSetsIds();
  }, [selectedItems]);
  

 // console.log("the search term is", searchTerm);

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

    const itemHasChildren =
      selectedCategory &&
      selectedCategory.subcategories &&
      Object.keys(selectedCategory.subcategories).length > 0;
    console.log("Item has children:", itemHasChildren);

    if (!itemHasChildren) {
      setIsMenuOpen(false);
    }
  };

 // console.log("The Selected Item from searchBar", selectedItems);

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
  const ShowAllCards = async () => {
    try {
      const allCardList: any = await fetchQuestionSets(0, 0, 0);
      setMatchingQuestionSets(allCardList);
      setSelectedItems([]);
      setIsAllSelected(true); // Clear the selection when "All" is clicked
    } catch (error) {
      console.error("Error fetching all cards:", error);
    }
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
            onClick={() => {
              handleItemClick(mainCategory, level), setIsAllSelected(false);
            }}
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

  const handleSuggestionClick = async (suggestion: string) => {
    const pathItems = suggestion.split(" > ");
    pathItems.forEach((item, level) => handleItemClick(item, level));
    setSearchTerm("");
    setFilteredSuggestions([]);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const ListOfAllIds: any = await fetchSelectedItemId([searchTerm]);
      setListOfAllIds(ListOfAllIds);
      setFilteredSuggestions([]);
    }
  };

  return (
    <div className="mx-2 p-4 border rounded-md bg-neutral-50" ref={menuRef}>
     
      <div className="flex flex-col lg:flex-row justify-between ">
        
      <div className="flex justify-between items-center">
      <div className="flex gap-3 md:gap-5">
        <span >
          {" "}
          <FaList size={24} color="#01AFF4" />
        </span>
        <span className=" text-md md:text-xl font-semibold font-spline text-slate-800">AI-Generated Question Sets</span>
        </div>
        <div className=" flex justify-end m-2 ">
            <button
              className=" block lg:hidden text-gray-500 focus:outline-none m-2 "
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
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
          </div>
      </div>
        <header>
         
          <input
            type="text"
            placeholder="Search categories..."
            className="justify-center items-start p-4 w-full lg:w-96  leading-4 rounded-md border border-solid border-neutral-400  pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          {filteredSuggestions.length > 0 && (
            <div className="absolute bg-gray-100 shadow-lg  overflow-y-scroll scroll-smooth rounded-md w-4/5 md:w-2/3 lg:w-96 mt-4 z-10">
              <ul className="py-3">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-sky-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>
        
      </div>
      <nav
          className={`flex flex-col sm:flex-row  mt-2 justify-start items-center flex-wrap 2xl:flex-nowrap font-spline space-x-4 ${
            isMenuOpen ? "" : "hidden lg:flex"
          }`}
        >
          <span
            onClick={ShowAllCards}
            className={`flex flex-wrap font-spline text-sm cursor-pointer ${
              isAllSelected ? "text-blue-400" : "text-gray-700"
            }`}
          >
            Recommended
          </span>
          {renderCategories(categoriesData)}
        </nav>
    </div>
  );
};

export default CategorySearch;
