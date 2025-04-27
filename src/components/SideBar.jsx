import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";

const SideBar = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role=useSelector((state)=>state.auth.role);
  
  

  const Logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("email");
    localStorage.clear("id");
    localStorage.clear("role");
    localStorage.clear("token");
    navigate("/");
  };

  return (
    <>
      {value && (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-items-end lg:justify-between  h-[100%]">
          <div className="flex items-center flex-col justify-center ">
            <img
              className="h-[16vh] rounded-xl"
              src={value.data.avatar}
              alt="/"
            />

            <p className="mt-3 text-xl text-zinc-100 font-semibold">Name :
              <span className="m-2 text-zinc-100"> {value.data.username} </span> 
              
            </p>
            <p className="mt-3 text-normal text-zinc-100 ">Email : 
              <span className="m-2 text-zinc-400">{value.data.email}</span>
            </p>
            <p className="mt-3 w-[70%] text-normal text-zinc-100 "> Address : 
              <span className="m-2 text-zinc-400">{value.data.address}</span>
              
            </p>
            <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
          </div>
          {role==="user" && <div className="w-full flex-col items-center justify-center text-lg hidden lg:flex">
            <NavLink
              to="/profile/Favrioute"
              className={({ isActive }) =>
                `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
                  isActive ? "bg-zinc-900" : ""
                }`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              to="/profile/orderHistory"
              className={({ isActive }) =>
                `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
                  isActive ? "bg-zinc-900" : ""
                }`
              }
            >
              Order History
            </NavLink>

            <NavLink
              to="/profile/setting"
              className={({ isActive }) =>
                `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
                  isActive ? "bg-zinc-900" : ""
                }`
              }
            >
              Setting
            </NavLink>
          </div>}
          {role==="admin" && <div className="w-full flex-col items-center justify-center text-lg hidden lg:flex">
            <NavLink
              to="/profile/all-orders"
              className={({ isActive }) =>
                `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
                  isActive ? "bg-zinc-900" : ""
                }`
              }
            >
              All Orders
            </NavLink>

            <NavLink
              to="/profile/add-new-notebook"
              className={({ isActive }) =>
                `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
                  isActive ? "bg-zinc-900" : ""
                }`
              }
            >
             Add New Notebook 
            </NavLink>

           
          </div>}
          
          <button
            className="bg-slate-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
            onClick={Logout}
          >
            Log Out <IoIosLogOut className="ml-2 text-2xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default SideBar;
