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



export const fetchQuestionSets = async (subCategoryId:number,limitStart:number,limitSize:number,) => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(`/sets/all?sub_category_id=${subCategoryId}&limit_start=${limitStart}&limit_size=${limitSize}`, {
      headers: {
        Accept: "application/json",
        Token: token,
      },
    });

    const questionSets = response.data.data;
    
    console.log('Fetched question sets:', questionSets);
    return questionSets;
  } catch (error) {
    console.error('Error fetching question sets', error);
    return null;
  }
}

export const fetchSelectedItemId = async (selectedItems: string[]) => {
  try {
    const token = getToken();
    const termToSearch=selectedItems[selectedItems.length-1];
    console.log("we feed to find the term",termToSearch)
    const response = await axiosInstance.get(`/categories/search?term=${termToSearch}`, {
      headers: {
        Accept: "application/json",
        Token: token,
      },
    });
   
    const selectedItemsId = response.data.data;
    let listOfSearchTermsIds:number[]=[]
    
    selectedItemsId.map((item:any)=>listOfSearchTermsIds.push(item.id))
   // console.log('selected Items ids',listOfSearchTermsIds);
    return listOfSearchTermsIds;
  } catch (error) {
    console.error('Error fetching question sets', error);
    return null;
  }
}