import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import config from '../config';

interface Category {
  id: number;
  name: string;
  description: string;
  thumb: string;
  status: number;
  user_id: number;
  store_id: number;
  // Add other properties as needed
}

interface CategoryContextProps {
    categoryData: Category[];
    fetchCategoryData: () => Promise<void>;
}

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

// categoryContext.tsx

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
  
    async function fetchCategoryData(): Promise<void> {
      try {
        const response = await axios.get<{ data: { data: Category[] } }>(config.apiUrl+'category');
        setCategoryData(response.data.data.data);
        // console.log('categoryData_contex.tsx', response.data.data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    }
  
    useEffect(() => {
      fetchCategoryData();
    }, []);
  
    return (
      <CategoryContext.Provider value={{ categoryData, fetchCategoryData }}>
        {children}
      </CategoryContext.Provider>
    );
  };  