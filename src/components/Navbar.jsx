import React, { useState } from "react";
import A from "../assets/a.png";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { FaGripLines } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Close icon for mobile menu
import {  useSelector } from "react-redux";


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const role=useSelector((state)=>state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {/* Navbar */}
      <div className="bg-zinc-800 text-white px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/">
          <img src={A} alt="Logo" className="size-64 -my-20 -mb-24 -mx-8" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center justify-between">
          <ul className="flex gap-6 text-lg text-gray-400">
            {[
              { path: "/", icon: <IoHome /> },
              { path: "/about-us", icon: <TbInfoSquareRoundedFilled /> },
              { path: "/all-books", icon: <SiBookstack /> },
            ].map(({ path, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `text-2xl cursor-pointer transition-all duration-300 hover:text-primary hover:border-b-2 ${
                      isActive ? "text-primary border-b-2 border-primary" : "text-gray-400"
                    }`
                  }
                >
                  {icon}
                </NavLink>
              </li>
            ))}
            {/* Cart (Visible Only If Logged In) */}
            {isLoggedIn && (
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `text-2xl cursor-pointer transition-all duration-300 hover:text-primary hover:border-b-2 ${
                      isActive ? "text-primary border-b-2 border-primary" : "text-gray-400"
                    }`
                  }
                >
                  <FaShoppingCart />
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Profile Icon (Only If Logged In) */}
        {isLoggedIn && (
          <NavLink 
            to={`/profile/${role==="user"?"Favrioute":"all-orders"}`}
            
            className={({ isActive }) =>
              `text-2xl cursor-pointer transition-all duration-300 hover:text-primary hover:border-b-2 ${
                isActive ? "text-primary border-b-2 border-primary" : "text-gray-400"
              }`
            }
          >
            <CgProfile />
          </NavLink>
        )}

        {/* Login & Signup Buttons (If Not Logged In) */}
        {!isLoggedIn && (
          <div className="flex gap-4">
            <NavLink
              to="/login"
              className="border-2 font-semibold px-4 py-1 rounded-lg border-primary hover:bg-primary hover:text-gray-800"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="border-2 font-semibold px-4 py-1 rounded-lg border-primary hover:bg-primary hover:text-gray-800"
            >
              Signup
            </NavLink>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <FaGripLines className="text-3xl cursor-pointer" onClick={() => setNav(true)} />
        </div>

        {/* Mobile Navbar */}
        {nav && (
          <div className="fixed top-0 left-0 w-full h-screen bg-zinc-800 text-white flex flex-col items-center justify-center z-50">
            {/* Close Button */}
            <IoClose className="text-4xl absolute top-5 right-5 cursor-pointer" onClick={() => setNav(false)} />

            <ul className="flex flex-col gap-6 text-xl text-gray-400 text-center">
              {[
                { path: "/", label: "Home" },
                { path: "/about-us", label: "About Us" },
                { path: "/all-books", label: "Books" },
              ].map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `text-lg transition-all duration-300 ${
                        isActive ? "text-primary border-b-2 border-primary" : ""
                      }`
                    }
                    onClick={() => setNav(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              {/* Cart & Profile (Only If Logged In) */}
              {isLoggedIn && (
                <>
                  <li>
                    <NavLink to="/cart" onClick={() => setNav(false)}>
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" onClick={() => setNav(false)}>
                      Profile
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
