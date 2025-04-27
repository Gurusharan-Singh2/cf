import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const MobileNavSide = () => {
  
  const role=useSelector((state)=>state.auth.role);
  return (
    
    <div className='w-full flex md:hidden items-center justify-between my-4'>
    {role==='user' && <>   <NavLink
    to="/profile/Favrioute"
    className={({ isActive }) =>
      `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
        isActive ? "bg-fuchsia-900" : ""
      }`
    }
  >
    Favorites
  </NavLink>

  <NavLink
    to="/profile/orderHistory"
    className={({ isActive }) =>
      `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
        isActive ? "bg-fuchsia-900" : ""
      }`
    }
  >
    Order History
  </NavLink>

  <NavLink
    to="/profile/setting"
    className={({ isActive }) =>
      `text-zinc-100 font-semibold w-full py-2 text-center hover:bg-primary rounded transition-all ${
        isActive ? "bg-fuchsia-900" : ""
      }`
    }
  >
    Setting
  </NavLink> </> }
  { role==="admin" && <>
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
  </>}
   </div>
  )
}

export default MobileNavSide