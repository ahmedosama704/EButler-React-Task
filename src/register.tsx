import React from 'react'
import RegisterForm from './components/register/registerForm';


function Register() {
    const regImg: string = '/images/login.jpg';
    return (
        <div className='flexDev loginPage'>
            <img src={regImg} alt='Registration' />
            <RegisterForm />
        </div>
    )
}

export default Register
