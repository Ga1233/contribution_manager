import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import App from "./App";

import AboutPage from './AboutPage';
import { useState } from "react";
import RefreshHandler from './RefreshHandler';


function index() {
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const PrivateRoute=({element})=>{
       return isAuthenticated ? element : <Navigate to="/login"/>
    }

    return (
        <div className='main'>
            <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
            <Routes>
          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/AboutPage" element={<AboutPage />} />
          
          
          
          <Route path="/app" element={<PrivateRoute element={<App />}/>} />

          <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        </Routes>
        </div>
    )
}
export default index