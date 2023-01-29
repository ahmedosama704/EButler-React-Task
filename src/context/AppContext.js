import React, { createContext, useEffect, useState } from 'react';
import { en, ar } from '../localization/Localization';
export const AppContext = createContext();

export const MainProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [openSideNav, setOpenSideNav] = useState('close');
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(language == 'en' ? en : ar);
  useEffect(() => {
    if (language == 'en') {
      setContent(en);
    } else {
      setContent(ar);
    }
  }, [language]);

  const getUserData = () => {
    const data = localStorage.getItem('userData');
    setIsLogged(data);
  };
  const getNavData = () => {
    const data = localStorage.getItem('sideNav');
    setOpenSideNav(data);
  };
  const getUserLanguage = () => {
    const data = localStorage.getItem('userLang');
    setLanguage(data);
  };
  useEffect(() => {
    getUserData();
  }, [isLogged]);
  useEffect(() => {
    getNavData();
    getUserLanguage();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLogged,
        setIsLogged,
        content,
        language,
        setLanguage,
        openSideNav,
        setOpenSideNav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const { Consumer } = AppContext;
