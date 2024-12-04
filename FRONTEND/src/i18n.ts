import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

type TranslationResources = {
  [key: string]: {
    [key: string]: string | { [key: string]: string }; 
  };
};

const loadResources = async (): Promise<{ [key: string]: TranslationResources }> => {
  const en = await import('@/locales/en.json');
  const uk = await import('@/locales/uk.json');

  return {
    en: {
      translation: en.default, 
    },
    uk: {
      translation: uk.default,
    },
  };
};

const resources = await loadResources();

i18next
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'en', 
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'], 
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next', 
    },
    lng: localStorage.getItem('language') || navigator.language.split('-')[0] || 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources,
    react: {
      useSuspense: false, 
    }, 
  })
  .then(() => {
    const detectedLanguage = i18next.language;
    
    if (detectedLanguage === 'ru') {
      i18next.changeLanguage('uk');
    }
  });

export default i18next;
