import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader';
import EmptyFavrioute from './EmptyFavrioute';
import { NavLink } from 'react-router-dom';

const OrderHistory = () => {
  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    
  };
  const [Data,setData]=useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-orders`,{headers});
      setData(response.data.data);
    };
    fetch();
  }, []);

  console.log(Data);
  

  
  
  
  return (<>
  
  
    {!Data && <div className='flex justify-center items-center'>
      <Loader></Loader>
      
      </div>}
      {Data.length===0 && <div className="w-full h-full flex justify-center items-center"> <EmptyFavrioute></EmptyFavrioute> </div>  }
       
      {Data && Data.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
          <div className='w-[7%]'>
            <h1 className='text-center'>Sr.</h1>
          </div>
          <div className='w-[27%]'>
            <h1 className='text-center'>NoteBooks</h1>
          </div>
          <div className='w-[25%]'>
            <h1 className='text-center'>Pages</h1>
          </div>
          
          <div className='w-[16%]'>
            <h1 className='text-center'>Status</h1>
          </div>
          <div className='w-none md:w-[5%] hidden md:block'>
            <h1 className='text-center'>Mode</h1>
          </div>
          <div className='w-none md:w-[20%] hidden md:block'>
            <h1 className='text-center'>PaymentDetail</h1>
          </div>
          </div>
          {
            Data.map((item,i)=>(
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:cursor-pointer' key={i}>
                 <div className='w-[7%] '>
            <h1 className='text-center'>{i+1}</h1>
          </div>
          <div className='w-[27%] flex justify-center'>
            <NavLink to={`/get-book/${item.notebook._id}`} className="hover:text-blue-300"><img src={item.notebook.url} className='h-[5vh]' alt="" /></NavLink>
          </div>
          <div className='w-[25%]'>
            <h1 className='text-center'>{item.notebook.pages}</h1>
          </div>
          
          <div className='w-[16%]'>
            <h1 className=' font-semibold text-green-500'>
              {item.status==="Delivered" ? (
                <div className='text-yellow-500'>{item.status}</div>
              ):item.status==="Out For Delivery"?(
                <div className='text-red-500'>{item.status}</div>
              ):(<div>{item.status}</div>)
            }
              </h1>
          </div>
          <div className='w-none md:w-[5%] hidden md:block'>
            <h1 className=''>Online</h1>
          </div>
          <div className='w-[20%] flex justify-center items-center'>
            <NavLink to={'/getPaymentDetail'} ><button className='bg-blue-600 px-2 py-1.5 rounded-full text-gray-100'>PaymentInfo</button></NavLink>
          </div>


              </div>
            ))
          }

          
         
        </div>

      )

      }
      </>
  )
}

export default OrderHistory