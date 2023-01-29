import React from 'react'
import LoginForm from './components/logIn/LoginForm'

function Login() {
    const logImg: string = '/images/login.jpg';

    return (
        <div className='flexDev loginPage'>
            <img src={logImg} alt='Login' />
            <LoginForm />
        </div>
    )
}

export default Login
