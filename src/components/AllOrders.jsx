import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import EmptyFavrioute from './EmptyFavrioute'
import { NavLink } from 'react-router-dom'
import { TiTick } from "react-icons/ti";

const AllOrders = () => {
  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
  }
  const [Data,SetData]=useState([])
  const [status,Setstatus]=useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  
  const fetch=async()=>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-all-orders`,
        {headers} 
      );
    SetData(response.data.data);
   
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(() => {
    
    fetch();
   
  }, [updateFlag])
   const HandleStatus=async(Orderid)=>{
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/update-order/${Orderid}`,{status:status},
        {headers} 
      )
      setUpdateFlag(!updateFlag)
      console.log(response.data);
      
      
    } catch (error) {
      alert(error)
      console.log(error);
      
    }
   }

   
  
  
  return<> 
    {!Data && <div className='flex justify-center items-center'>
      <Loader></Loader></div>}
      
      {Data.length===0 && <div className="w-full h-full flex justify-center items-center"> <EmptyFavrioute></EmptyFavrioute> </div>  }
       
      {Data && Data.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            All Orders
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
          <div className='w-[3%]'>
            <h1 className='text-center'>Sr.</h1>
          </div>
          <div className='w-[22%]'>
            <h1 className='text-center'>NoteBooks</h1>
          </div>
          <div className='w-[20%]'>
            <h1 className='text-center'>Pages</h1>
          </div>
          <div className='w-[9%]'>
            <h1 className='text-center'>Prices</h1>
          </div>
          <div className='w-[41%]'>
            <h1 className='text-center'>Status</h1>
          </div>
          <div className='w-none md:w-[5%] hidden md:block'>
            <h1 className='text-center'>Mode</h1>
          </div>
          </div>
          {
            Data.map((item,i)=>(
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:cursor-pointer hover:bg-zinc-900' key={i}>
                 <div className='w-[3%] '>
            <h1 className='text-center'>{i+1}</h1>
          </div>
          <div className='w-[22%] flex justify-center'>
            <NavLink to={`/get-book/${item.notebook._id}`} className="hover:text-blue-300"><img src={item.notebook.url} className='h-[5vh]' alt="" /></NavLink>
          </div>
          <div className='w-[20%]'>
            <h1 className='text-center'>{item.notebook.pages}</h1>
          </div>
          <div className='w-[9%]'>
            <h1 className='text-center'>₹ {item.notebook.price}</h1>
          </div>
          <div className='w-[41%] flex items-center gap-1 flex-col'>
            <h1 className=' font-semibold text-green-500'>
            {item.status === 'Delivered' ? (
                <div className='text-yellow-500'>{item.status}</div>
              ) : item.status === 'Out For Delivery' ? (
                <div className='text-red-500'>{item.status}</div>
              ) : (
                <div>{item.status}</div>
              )}
              </h1>
              <div className='flex gap-1'>
                <select name="status" id="" className='bg-gray-800' onChange={(e)=>Setstatus(e.target.value)}>
                  {[
                    "Order Placed", "Out For Delivery", "Delivered"
                  ].map((item,i)=>{
                    return <option value={item} key={i}>{item}</option>
                  })}
                </select>
                <button className='text-3xl' onClick={()=>HandleStatus(item._id)}><TiTick /></button>
                
              </div>
          </div>
          <div className='w-none md:w-[5%] hidden md:block'>
            <h1 className=''>COD</h1>
          </div>


              </div>
            ))
          }

          
         
        </div>

      )

      }

      </>
  
}

export default AllOrders