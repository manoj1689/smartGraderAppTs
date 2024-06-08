// HandleDashboard.ts
import axiosInstance from '../axios/axiosInstance';
import { Category } from '../../types/interfaces/interface';

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
