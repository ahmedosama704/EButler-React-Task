import React, { useState, useContext } from 'react';
import Styles from './styles/home.module.scss';
import { useQuery, useQueryClient } from 'react-query';
import { getUsers, } from './constants/usersApi';
import { AppContext } from './context/AppContext';
import EditUser from './components/home/editUser/editUser';
import UserTable from './components/home/usersTable/userTable';
import Header from './components/shared/header';


function Home() {
    const { language, openSideNav } = useContext(AppContext);
    const [editUser, setEditUser] = useState(null);
    const {
        data
    } = useQuery('users', getUsers);
    return (
        <div className={Styles.homeScreen} style={{ paddingRight: openSideNav == "open" ? "calc(20vw + 20px)" : "50px" }}>

            <Header />
            <h2> {language == "en" ? "Users List" : 'قائمه الاعضاء'}  </h2>
            <div className={Styles.usersTable}>
                <UserTable usersData={data} setEditUser={setEditUser} />
            </div>
            <h2> {language == "en" ? "Edit User Data " : ' تعديل بيانات العضو '}  </h2>
            <div className={Styles.usersTable}>
                <EditUser userId={editUser} setEditUser={setEditUser} />
            </div>
        </div>
    )
}

export default Home
