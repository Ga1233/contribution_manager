import React from "react";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    
    email: "",
    password: ""
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const {  email, password } = loginInfo;
    if ( !email || !password) {
      return handleError(' email and password are required');
    }
    try {
      const url = 'http://localhost:5000/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      
      const result = await response.json();
      const {success,message,jwtToken,name,error}=result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/app');
        },1000);
      }else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      console.error('Error during signup:', err);
      handleError(err.message || 'Something went wrong');
    }
  };
  


  return (
    <div className="container min-h-screen bg-cover bg-center" >
      
      <h1 className="font-bold text-gray-700 tracking-tight text-lg">Login</h1>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
        
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input onChange={handleChange} type="email" name="email" autoFocus placeholder="Enter your email"
            value={loginInfo.email} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input   onChange={handleChange} type="password" name="password" autoFocus placeholder="Enter your password"
            value={loginInfo.password} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
        <span>Don't have an account ?
          <Link to="/signup" className="block text-gray-700 font-medium mb-2">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;