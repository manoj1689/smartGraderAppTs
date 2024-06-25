import axiosInstance from "../axios/axiosInstance";
import { Category,Card } from "../../types/interfaces/interface";
import { getToken } from "../../utils/tokenUtils";
// Type definitions for API responses and data structures

export const fetchCategories = async (categoryId: number): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get(`/categories/subcat?category_id=${categoryId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchCardsData = async (subCategoryId: number, token: string, selectedCategories: string[]): Promise<Card[]> => {
  try {
    const response = await axiosInstance.get(`/sets/all?sub_category_id=${subCategoryId}`, {
      headers: {
        Accept: "application/json",
        Token: token,
      },
    });
    const responseData = response.data.data;
    return selectedCategories.length > 0
      ? responseData.filter((item: Card) => selectedCategories.includes(item.title))
      : responseData;
  } catch (error) {
    console.error("Error fetching cards data:", error);
    return [];
  }
};
export const fetchQuestionSets = async (selectedItems: string[]) => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(`/sets/all?sub_category_id=2`, {
      headers: {
        Accept: "application/json",
        Token: token,
      },
    });
    const questionSets = response.data.data;

  //  console.log('Fetched question sets:', questionSets);
   // console.log('Selected Items:', selectedItems);

    // Check if the entered path matches any result in the question sets
    const matchingSets = questionSets.filter((set:any) =>
      selectedItems.some(item => set.title.includes(item))
    );

    if (matchingSets.length > 0) {
      console.log('Matching sets:', matchingSets);
      return matchingSets;
    } else {
      console.log('No matching sets found for the selected items');
      return [];
    }

  } catch (error) {
    console.error('Error fetching question sets', error);
    return null;
  }
};


export const fetchSearchResults = async (searchTerm: string): Promise<Category[]> => {
  if (!searchTerm) return [];
  try {
    const response = await axiosInstance.get(`/categories/search?term=${searchTerm}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

// New function to fetch both categories and cards data
export const fetchData = async (categoryId: number, subCategoryId: number, token: string, selectedCategories: string[]) => {
  try {
    const categoriesData = await fetchCategories(categoryId);
    const cardsData = await fetchCardsData(subCategoryId, token, selectedCategories);
    return { categoriesData, cardsData };
  } catch (error) {
    console.error("Error fetching combined data:", error);
    return { categoriesData: [], cardsData: [] };
  }
};
