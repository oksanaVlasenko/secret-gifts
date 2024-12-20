import { createContext, useContext, ReactNode } from 'react';
import { FilterProps } from '@/blocks/home/filters/Filter.types';

const FilterContext = createContext<FilterProps | undefined>(undefined);

export const FilterProvider = ({ children, value }: { children: ReactNode, value: FilterProps }) => {
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilterContext = (): FilterProps => {
  const context = useContext(FilterContext);
  
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  
  return context;
};
