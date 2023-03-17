import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import translations from '../api/translations.json';

const LanguageContext = createContext();
export const useLanguage = () => {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');
  const [text, setText] = useState(translations["es"]);

  
  const handleLanguage = () => {
  }
  

  const data = {
    text
  }
  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  )
}