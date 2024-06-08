import axiosInstance from "../axios/axiosInstance";
import { Category,Card } from "../../types/interfaces/interface";
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
