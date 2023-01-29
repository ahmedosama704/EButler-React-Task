import React, { useContext } from 'react';
import LogIn from './login';
import './styles/globals.scss';
import './styles/arabic.scss';
import { AppContext, } from './context/AppContext';
import Register from './register';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NotFound from './404';
import Home from './home';
import Header from './components/shared/header';
function App() {
  const { language, isLogged } = useContext(AppContext);

  return (
    <div className={language == 'en' ? 'englishVersion' : 'arabicVersion'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogged ? <Home /> : <LogIn />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/login" element={isLogged ? <Navigate replace to="/" /> : <LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
