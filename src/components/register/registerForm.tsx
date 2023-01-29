import React, { useState, useContext } from 'react';
import Styles from "./registerForm.module.scss";
import { AppContext } from '../../context/AppContext';
import { useNavigate, Link } from "react-router-dom";
import ChangeLanguage from '../shared/changeLanguage/changeLanguage';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, addUser } from '../../constants/usersApi';


type DataType = {
    title: number;
    email?: string;
    password?: string;
    confirmPassword?: string;
    Name?: string;
    phone?: string;
    login?: string;
    registerButton?: string;
    insertPassword?: string | any;
    goToRegister?: string;
    insertEmail?: string;
    alreadyUser?: string;
    nameValidation: string;
    emailValidation: string;
    phoneValidation: string;
    passwordValidation: string;
    confirmPasswordValidation: string;
}

type FromData = {
    name: any;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}
interface ErrorMessageType {
    [key: string]: any
}

const RegisterForm = () => {
    const { content, updateUsers, setUpdateUsers } = useContext(AppContext);
    const data: DataType = content.register;
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FromData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errorName, setErrorName] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPhone, setErrorPhone] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

    const webQueryClient = useQueryClient();
    const { data: users } = useQuery('users', getUsers);

    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            webQueryClient.invalidateQueries("users")
        }
    })

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (formData.name.length < 3) {
            setErrorName(data.nameValidation)
        } else {
            setErrorName('')
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            setErrorEmail(data.emailValidation)
        } else {
            setErrorEmail('')
        }

        if (!/^\d{11}$/.test(formData.phone)) {
            setErrorPhone(data.phoneValidation)
        } else {
            setErrorPhone('')
        }

        if (formData.password.length < 5) {
            setErrorPassword(data.passwordValidation)
        } else {
            setErrorPassword('')
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorConfirmPassword(data.confirmPasswordValidation)
        } else {
            setErrorConfirmPassword('')
        }
        if (formData.name.length > 3 && formData.password.length > 5 && errorName.length == 0 && errorEmail.length == 0 && errorPhone.length == 0 && errorPassword.length == 0 && errorConfirmPassword.length == 0) {
            setIsLoading(true);
            addMutation.mutate({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });
            setTimeout(() => {
                setIsLoading(false);
                navigate("/login");
            }, 1000)
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
    };
    return (
        <div className={Styles.register}>
            <ChangeLanguage />
            <div className={Styles.formBox}>
                <h2> {data.title}</h2>
                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder={data.Name} name="name" value={formData.name} onChange={handleChange} />
                    {errorName && <h6 className='validation'> {errorName} </h6>}

                    <input type="email" placeholder={data.email} name="email" value={formData.email} onChange={handleChange} />
                    {errorEmail && <h6 className='validation'> {errorEmail}</h6>}

                    <input type="tel" placeholder={data.phone} name="phone" value={formData.phone} onChange={handleChange} />
                    {errorPhone && <h6 className='validation'> {errorPhone}</h6>}

                    <input type="password" placeholder={data.password} name="password" value={formData.password} onChange={handleChange} />
                    {errorPassword && <h6 className='validation'> {errorPassword}</h6>}

                    <input type="password" placeholder={data.confirmPassword} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errorConfirmPassword && <h6 className='validation'> {errorConfirmPassword}</h6>}

                    <button type="submit" className={isLoading ? Styles.loading : ''}>    {isLoading ? <span /> : data.title} </button>
                    <h5> {data.alreadyUser} <Link to="/login" className="link">
                        {data.login}
                    </Link></h5>
                    <h6 className='alert'> {message} </h6>
                </form>
            </div>
        </div>
    );
};
export default RegisterForm 