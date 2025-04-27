import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import EmptyFavrioute from './EmptyFavrioute';

const Settings = () => {
 
    const headers={
      id:localStorage.getItem("id"),
      atoken:localStorage.getItem("token"),
      role:localStorage.getItem("role"),
      email:localStorage.getItem("email"),
      
    };
    
  
    const [Data,setData]=useState({
      username:"x"
    });
    const [Address,setAddress]=useState();
    useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-user`,{headers});
        setData(response.data.data);
        setAddress(response.data.data.address)
      };
      fetch();
    }, []);
    
    
    const Update=async()=>{
      try {
        const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/update-address`,{address:Address},{headers});
        alert(response.data.message);
        
        
      } catch (error) {
        alert(error.data.message)
        
      }
    }
    
    
    
  return <> 
    { !Data && <div className='flex justify-center items-center'>
      <Loader></Loader>
      
      </div>}
     
       
      {Data  && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{(Data.username).toUpperCase()}</p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{Data.email}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
  <label htmlFor="address">Address</label>
  {Address !== undefined && (
    <textarea
      name="address"
      id="address"
      className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
      rows="5"
      placeholder="Address"
      value={Address}  // <-- Use value instead of children
      onChange={(e) => setAddress(e.target.value)}
    />
  )}
</div>

          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400' onClick={Update} >Update</button>
          </div>
        </div>
      )
  }
  </>
}

export default Settings