import React, { useContext } from 'react';
import LogIn from './pages/logIn/login';
import './styles/globals.scss';
import './styles/arabic.scss';
import { AppContext, } from './context/AppContext';
import Register from './pages/register/register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './pages/404/404';
import Home from './pages/home/home';
function App() {
  const { language, isLogged, websiteLoading } = useContext(AppContext);
  console.log('isLogged :', isLogged);

  return (
    <div className={language == 'en' ? 'englishVersion' : 'arabicVersion'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={websiteLoading ? <div className="wbeLoader"><div className="loader" /></div> : isLogged ? <Home /> : <LogIn />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
          <Route path="/login" element={isLogged ? <Navigate replace to="/" /> : <LogIn />} />
          <Route path="/register" element={isLogged ? <Navigate replace to="/" /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
