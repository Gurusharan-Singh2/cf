import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
   const [Value, setValue] = useState({
      username: "",
      password: "",
     
    });
    const navigate=useNavigate();
    const dispatch=useDispatch()

    const change = (e) => {
      const { name, value } = e.target;
      setValue({ ...Value, [name]: value });
    };
    const submit = async (e) => {
      try {
        e.preventDefault();
      if(Value.username==="" ||  Value.password==="" ){
        alert("All feilds are required");
      }else{
        const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`,Value);
        
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        localStorage.setItem("email",response.data.email);
        
       
        navigate("/")
  
      }
        
      } catch (error) {
        alert(error.response.data.message)
        
        
      }
      
    };


  return (<>
    <div className="h-full pb-2 px-2  w-screen bg-zinc-900 flex justify-center items-start ">
      <div className="bg-zinc-800 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:w-[35vw] px-6 sm:px-8 md:px-10 py-6 flex flex-col gap-5 text-gray-400 mt-14 rounded-lg shadow-lg sm:mb-16">
        
        <h2 className="text-white text-2xl font-semibold text-center">Login</h2>
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="bg-zinc-900 rounded text-white h-10 w-full px-3 focus:outline-none" name='username' value={Value.username} onChange={change} />
        </div>
        
        
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" className="bg-zinc-900 rounded text-white h-10 w-full px-3 focus:outline-none" value={Value.password} onChange={change} />
        </div>
        
       
        
        <input type="submit" value="Login" className="bg-primary font-semibold w-full text-white rounded-xl py-3 mt-2 cursor-pointer hover:bg-opacity-80 transition" onClick={submit} />
        <p className='text-white  text-center pt-2 text-xl' >Or</p>
        <p className='text-zinc-400 mt-0.5 text-center'>Already have an account? <a href="/signup" className='border-b-2 border-zinc-700'>Sign Up</a></p>
      </div>
    </div>
  </>
  )
}

export default Login