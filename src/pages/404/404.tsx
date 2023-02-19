


import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/shared/header';


function NotFound() {
    const { openSideNav } = useContext(AppContext);

    return (
        <div className="notFound" style={{ paddingRight: openSideNav == "open" ? "calc(20vw + 20px)" : "50px" }}>

            <Header />
            <img src='/images/404.svg' alt='404' />
        </div>
    )
}

export default NotFound
