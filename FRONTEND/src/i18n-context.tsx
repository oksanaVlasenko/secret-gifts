import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction, i18n } from 'i18next'; 

interface I18nContextType {
  t: TFunction;
  i18n: i18n;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  return (
    <I18nContext.Provider value={{ t, i18n }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
};
