import { createContext, useContext, ReactNode } from 'react';
import { DropdownProps } from '@/components/dropdown/Dropdown.types';

const DropdownContext = createContext<DropdownProps | undefined>(undefined);

export const DropdownProvider = ({ children, value }: { children: ReactNode, value: DropdownProps }) => {
  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

export const useDropdownContext = (): DropdownProps => {
  const context = useContext(DropdownContext);
  
  if (!context) {
    throw new Error('useDropdownContext must be used within a DropdownProvider');
  }
  
  return context;
};
