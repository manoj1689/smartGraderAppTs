// handleInterest.ts
import axiosInstance from "../axios/axiosInstance";
import { getToken } from "../../utils/tokenUtils";
import { API_BASE_URL } from "../../constants/Constants";
export const fetchCategories = async (setCategories: (categories: any[]) => void) => {
  try {
    const response = await axiosInstance.get('/categories/all');
    console.log('Response data:', response.data.data);
    setCategories(response.data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const toggleCategory = (
  category: any,
  selectedCategories: any[],
  setSelectedCategories: (categories: any[]) => void
) => {
  if (selectedCategories.includes(category.id)) {
    setSelectedCategories(selectedCategories.filter((c) => c !== category.id));
  } else {
    setSelectedCategories([...selectedCategories, category.id]);
  }
};

export const handleSubmit = async (
  selectedCategories: any[],
  notify: () => void,
  navigate: any,
  toast: any
) => {
  if (selectedCategories.length >= 5) {
    const token = getToken();

    if (!token) {
      toast.error('Token is missing. Please log in again.');
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/users/career_domain`,
        selectedCategories,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token
          }
        }
      );
      console.log(response);
      if (response.data.status === 1 && response.data.msg === "success") {
        console.log("Proceeding with selected categories:", selectedCategories);
        navigate("/dashboard");
      } else {
        toast.error('Failed to save selected categories.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while submitting your selection.');
    }
  } else {
    notify();
  }
};
