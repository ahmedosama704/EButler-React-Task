


import React, { useState, useContext } from 'react';
import Styles from './styles/home.module.scss';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, updateUser, deleteUser, addUser } from './constants/usersApi';
import { AppContext } from './context/AppContext';
import EditUser from './components/home/editUser/editUser';
import UserTable from './components/home/usersTable/userTable';
import Header from './components/shared/header';


function NotFound() {
    const { language, openSideNav } = useContext(AppContext);

    return (
        <div className="notFound" style={{ paddingRight: openSideNav == "open" ? "calc(20vw + 20px)" : "50px" }}>

            <Header />

            <img src='/images/404.svg' alt='404' />
        </div>
    )
}

export default NotFound
