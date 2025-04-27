import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom'

const FavriouteBooksCard = ({item,favrioute}) => {
  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    bookid:item._id
  }
  const RemoveCart=async()=>{
    try {
      const fetch = async () => {
        const x = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-book-to-favrioute`,{headers});
        alert(x.data.message);
        
      };
      fetch();

      
    } catch (error) {
      alert(error.data)
      
    }
  }  

  return ( <>
  
   
     <div className='bg-zinc-800 rounded p-4 flex flex-col'>
     <NavLink to={`/get-book/${item._id}`}>
       <div className='bg-white rounded flex items-center justify-center'><img src={item.url} alt="" className='h-[32vh]' /></div>
       <div className='flex justify-between items-center' >
       <h2 className='flex my-3 text-lg text-green-400 font-semibold '>Price :₹<p>{item.price}</p> </h2>
       <h2 className='text-sm text-white'>{item.pages} Pages</h2>
       </div>
       </NavLink>
       {favrioute &&  <button type="button" className="focus:outline-none text-black font-bold bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 flex justify-center" onClick={RemoveCart}>Remove From Favrioutes</button> }
      

     </div>
 

   </>
    
   )
 
}

export default FavriouteBooksCard