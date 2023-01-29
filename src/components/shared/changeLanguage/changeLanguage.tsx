import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import Style from './changeLanguage.module.scss';

export default function ChangeLanguage() {
    const { language, setLanguage } = useContext(AppContext);
    return (
        <div className={`${Style.changeLanguage} languageBtn`}>
            <a onClick={() => {
                setLanguage(language == "en" ? 'ar' : 'en');
                localStorage.setItem('userLang', language == "en" ? 'ar' : 'en');
            }}> {language == "ar" ? "English" : " عربي"} </a>
        </div>
    )
}
