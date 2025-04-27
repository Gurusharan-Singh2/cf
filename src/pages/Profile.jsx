import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from  'axios';
import { useState } from 'react';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import MobileNavSide from '../components/MobileNavSide';

const Profile = () => {
  

  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email")
  }
 
  const [Profile, setProfile] = useState();
  useEffect(()=>{
    const fetch=async()=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/get-user`,{headers});

        setProfile(response.data);
        
        
      } catch (error) {
        console.log(error.data);
        
        
      }
    }

    fetch();


  },[])
  return (
    <>{!Profile? <div className='flex h-full items-center justify-center'>
      
      <Loader></Loader>

    </div>:<div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white'>
      <div  className='w-full  lg:w-2/6 min-h-[30vh] lg:min-h-[80vh]'><SideBar value={Profile}></SideBar>
      <MobileNavSide></MobileNavSide>
      </div>
      <div className='w-full lg:w-4/6'><Outlet></Outlet></div>


    </div>}
    </>
    
  )
}

export default Profile