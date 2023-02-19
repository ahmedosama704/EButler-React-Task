import React, { useState, useContext } from 'react';
import Styles from "./login.module.scss";
import { AppContext } from '../../context/AppContext';
import { useNavigate, Link } from "react-router-dom";
import ChangeLanguage from '../shared/changeLanguage/changeLanguage';
import { getUsers } from '../../constants/usersApi';
import { useQuery } from 'react-query';

interface LoginTypes {
    data?: DataType;
}
type DataType = {
    title: number;
    email?: string;
    password?: string;
    loginButton?: string;
    insertEmail?: string | any;
    insertPassword?: string | any;
    goToRegister?: string;
    register?: string;
}

type userType = {
    email?: string;
    password?: string;
}
const LoginForm: React.FC<LoginTypes> = () => {
    const { content, setIsLogged } = useContext(AppContext);
    const data: DataType = content.login;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { data: users } = useQuery('users', getUsers);
    console.log('users :', users);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!isLoading) {
            if (email.length > 7) {
                if (password.length > 3) {
                    setIsLoading(true);
                    const existingUser = users && users.filter((item: userType) => {
                        if (item.email === email) {
                            return (item)
                        }
                    });
                    console.log('existingUser :', existingUser[0]);
                    if (existingUser[0] !== undefined && existingUser[0].email === email) {
                        if (existingUser[0].password == password) {
                            setMessage("Success");
                            setTimeout(() => {
                                setIsLogged(true);
                                localStorage.setItem('userData', JSON.stringify(true));
                                setIsLoading(false);
                                navigate("/");
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 1000)
                            setMessage("Wrong Password")
                        }
                    } else {
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000)
                        setMessage("Wrong Email")
                    }

                } else {
                    setMessage(data && data.insertPassword)
                }
            } else {
                setMessage(data && data.insertEmail)
            }
        }
    };
    return (
        <div className={Styles.logIn}>
            <ChangeLanguage />
            <div className={Styles.formBox}>
                <h2> {data.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input data-cy="inputEmail" type="email" name="email" placeholder={data.email} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input data-cy="inputPassword" type="password" name="password" placeholder={data.password} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button data-cy="submitButton" type="submit" className={isLoading ? Styles.loading : ''}>    {isLoading ? <span /> : 'Login'} </button>
                    <h5> {data.goToRegister} <Link to="/register" className="link">
                        {data.register}
                    </Link></h5>
                    <h6 className='alert'> {message} </h6>

                </form>

            </div>
        </div>
    )
}
export default LoginForm  