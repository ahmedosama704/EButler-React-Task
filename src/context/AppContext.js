import React, { createContext, useEffect, useState } from 'react';
import { en, ar } from '../localization/Localization';
export const AppContext = createContext();

export const MainProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [openSideNav, setOpenSideNav] = useState('close');
  const [language, setLanguage] = useState('en');
  const [websiteLoading, setWebsiteLoading] = useState(true);
  console.log('websiteLOading :', websiteLoading);
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
    setOpenSideNav(data !== null ? data : 'close');
  };
  const getUserLanguage = () => {
    const data = localStorage.getItem('userLang');
    setLanguage(data !== null ? data : 'en');
  };
  useEffect(() => {
    getUserData();
  }, [isLogged]);
  useEffect(() => {
    getNavData();
    getUserLanguage();
    setTimeout(() => {
      setWebsiteLoading(false);
    }, 1000);
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
        websiteLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const { Consumer } = AppContext;
