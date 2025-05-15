import React from "react";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";




function Signup() {
  const [signupInfo, setSignInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required');
    }
    try {
      const url = 'http://localhost:5000/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      
      const result = await response.json();
      const {success,message,error}=result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login');
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
    <div className="container min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Cosmos BD.svg')" }} >
      
      <h1 className="font-bold text-white tracking-tight text-lg">Signup</h1>
      <form onSubmit={handleSignup} className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input onChange={handleChange} type="text" name="name" autoFocus placeholder="Enter your name"
            value={signupInfo.name} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input onChange={handleChange} type="email" name="email" autoFocus placeholder="Enter your email"
            value={signupInfo.email} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input onChange={handleChange} type="password" name="password" autoFocus placeholder="Enter your password"
            value={signupInfo.password} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Signup</button>
        <span>Already have an account ?
          <Link to="/login" className="block text-gray-700 font-medium mb-2">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;