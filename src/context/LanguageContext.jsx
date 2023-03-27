import { useContext, createContext, useState, useMemo, useCallback } from "react";
import translations from '../api/translations.json';
import { LANGUAGES } from "./types";

const LanguageContext = createContext();
export const useLanguage = () => {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
  const main = "en";
  const [lang, setLang] = useState(main);
  const [text, setText] = useState(translations[main]);


  const handleLanguage = useCallback(({ name }) => {
    setLang(name);
    if (name === "spain")
      setText(translations.es)
    else if (name === "united-kingdom")
      setText(translations.en)
    else if (name === "france")
      setText(translations.fr)
    else setText(translations.chn)
  }, [])


  const data = useMemo(() => ({
    text,
    lang,
    handleLanguage
  }), [text.lang, handleLanguage]);

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  )
}