import axios from 'axios';
import axiosInstance from '../axios/axiosInstance';
import { getToken } from '../../utils/tokenUtils';
interface Category {
  id: number;
  name: string;
  parent_id?: number | null;
  subcategories?: Record<string, Category>;
}

export const fetchCategories = async (): Promise<Record<string, Category>> => {
  try {
    const response = await axiosInstance.get('/categories/all');
    return transformCategories(response.data.data);
  } catch (error) {
    console.error('Error fetching categories', error);
    return {};
  }
};

const transformCategories = (categories: Category[]): Record<string, Category> => {
  const categoryMap: Record<string, Category> = {};

  categories.forEach(category => {
    if (!category.parent_id) {
      categoryMap[category.name] = { ...category, subcategories: {} };
    } else {
      const parent = findParent(categoryMap, category.parent_id);
      if (parent) {
        parent.subcategories![category.name] = { ...category, subcategories: {} };
      }
    }
  });

  return categoryMap;
};

const findParent = (categories: Record<string, Category>, parentId: number): Category | null => {
  for (const key in categories) {
    if (categories[key].id === parentId) {
      return categories[key];
    } else if (categories[key].subcategories && Object.keys(categories[key].subcategories!).length) {
      const found = findParent(categories[key].subcategories!, parentId);
      if (found) return found;
    }
  }
  return null;
};

export const filterQuestionList=[]



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

    console.log('Fetched question sets:', questionSets);
    console.log('Selected Items:', selectedItems);

    // Check if the entered path matches any result in the question sets
    // const matchingSets = questionSets.filter((set: any) =>
    //   selectedItems.some(item => set.title.includes(item))
    // );

    if (selectedItems.length > 0) {
      const matchingSets = questionSets.filter((set: any) =>
        selectedItems.some(item => set.title.includes(item))
      );
      return matchingSets;
    } else {
      console.log('No matching sets found for the selected items');
      return questionSets;
    }
  } catch (error) {
    console.error('Error fetching question sets', error);
    return null;
  }
}