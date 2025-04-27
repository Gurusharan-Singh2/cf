import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const validate = () => {
    let errors = {};
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!Value.username.trim()) {
      errors.username = "Username is required";
    } else if (!usernameRegex.test(Value.username)) {
      errors.username = "Username must be at least 3 characters (letters/numbers only)";
    }

    if (!Value.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(Value.email)) {
      errors.email = "Enter a valid email";
    }

    if (!Value.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(Value.password)) {
      errors.password = "Password must be at least 6 characters (1 uppercase, 1 lowercase, 1 number)";
    }

    if (!Value.address.trim()) {
      errors.address = "Address is required";
    } else if (Value.address.length < 10) {
      errors.address = "Address must be at least 10 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
    if (validate()) {
      const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`,Value);
      setErrors({});
      alert(response.data.message);
      navigate("/login")

    }
      
    } catch (error) {
      alert(error.response.data.message)
      
      
    }
    
  };

  return (
    <>
      <div className="h-full pb-2 px-2 w-screen bg-zinc-900 flex justify-center items-start">
        <div className="bg-zinc-800 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:w-[35vw] px-6 sm:px-8 md:px-10 py-6 flex flex-col gap-5 text-gray-400 mt-14 rounded-lg shadow-lg sm:mb-16">
          <h2 className="text-white text-2xl font-semibold text-center">Sign Up</h2>

          <form onSubmit={submit} className="flex flex-col gap-4">
            {/* Username Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="bg-zinc-900 rounded text-white h-10 w-full px-3 focus:outline-none"
                value={Value.username}
                onChange={change}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-zinc-900 rounded text-white h-10 w-full px-3 focus:outline-none"
                value={Value.email}
                onChange={change}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-zinc-900 rounded text-white h-10 w-full px-3 focus:outline-none"
                value={Value.password}
                onChange={change}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Address Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="4"
                className="bg-zinc-900 rounded text-white h-32 w-full px-3 py-2 focus:outline-none"
                value={Value.address}
                onChange={change}
                placeholder="Please Enter Full Address for better service "
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary font-semibold w-full text-white rounded-xl py-3 mt-2 cursor-pointer hover:bg-opacity-80 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-white text-center pt-2 text-xl">Or</p>
          <p className="text-zinc-400 mt-0.5 text-center">
            Already have an account?{" "}
            <a href="/login" className="border-b-2 border-zinc-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
