import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Styles from './header.module.scss'
import {
    BrowserRouter as Router,
    Link, useNavigate
} from "react-router-dom";
import ChangeLanguage from './changeLanguage/changeLanguage';

export default function Header() {
    const { openSideNav, setOpenSideNav, language, setIsLogged } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <header className={Styles.header}>
            <button onClick={() => {
                if (openSideNav == "close") {
                    setOpenSideNav("open");
                    localStorage.setItem('sideNav', "open");
                } else {
                    setOpenSideNav("close");
                    localStorage.setItem('sideNav', "close");
                }
            }}> {language == "en" ? "Menu" : "القائمه"} </button>
            {openSideNav == "open" && (
                <div className={Styles.sideNav}>
                    <div>
                        <Link to="/" className="link">
                            {language == 'en' ? " Home " : "الرئيسيه "}
                        </Link>
                        <Link to="/login" className="link">
                            {language == 'en' ? "LogIn " : "تسجيل الدخول"}
                        </Link>
                        <Link to="/register" className="link">
                            {language == 'en' ? "Register " : "التسجيل"}
                        </Link>
                        <a onClick={() => {
                            setIsLogged("false");
                            localStorage.removeItem('userData');
                            localStorage.removeItem('sideNav');
                            navigate('login');
                        }}>
                            {language == 'en' ? "Log0ut " : " تسجيل الخروج"}</a>
                        <ChangeLanguage />
                    </div>
                </div>
            )}
        </header>
    )
}
