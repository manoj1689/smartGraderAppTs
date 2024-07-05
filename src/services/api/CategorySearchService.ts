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
    //console.log(transformCategories(response.data.data))
  } catch (error) {
    console.error('Error fetching categories', error);
    return {};
  }
};
export const fetchSubCategories = async (sub_category_id: any): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/categories/subcat?category_id=${sub_category_id}`);
    const transformedData = response.data.data.map((subCat: any) => ({
      value: subCat.id,
      label: subCat.name,
    }));
    console.log('Transformed Subcategories:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error fetching sub categories', error);
    return [];
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
    console.log("we need to find the term",termToSearch)
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
   console.log(`Id of ${termToSearch} is ${listOfSearchTermsIds}`)
    return listOfSearchTermsIds;
  } catch (error) {
    console.error('Error fetching question sets', error);
    return null;
  }
}