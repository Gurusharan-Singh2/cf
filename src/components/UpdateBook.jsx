import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const navigate=useNavigate()
  const [Data,SetData]=useState({
    price: "",
  pages: "",
  gsm: "",
  grade: "",
  length: "",
  breadth: "",
  });
  const {bookid}=useParams();

  

  useEffect(()=>{
    const fetch=async()=>{
      const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-book/${bookid}`);
      SetData(response.data.data);

      
    }
    fetch()
  },[])

  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    bookid:bookid
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetData({ ...Data, [name]: value });
    
    
  };
  const HandleUpdate=async()=>{
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/update-book`,
        Data,
        { headers }
      );
      alert(response.data.message);
      
      
      navigate(`/get-book/${bookid}`);
      
    } catch (error) {
      alert(error.data)
      
      
      
    }
  }
 

  
  return (
    <div className="h-[100%] bg-zinc-900  p-0 md:p-4">
    <h2 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Update Notebook</h2>
    
      <div className='p-4 bg-zinc-800 rounded'>
       <div>
        <label htmlFor="" className='text-zinc-400'>Price</label>
        <input type="number" name="price"  onChange={handleChange} className="border border-zinc-900 p-2 w-full text-white" value={Data.price} />
       </div>

       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Pages</label>
       <input type="number" name="pages"  onChange={handleChange} className="border border-zinc-900 p-2 w-full  text-white" value={Data.pages} />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>GSM</label>
       <input type="text" name="gsm" placeholder="Between 30-60" onChange={handleChange} className="border border-zinc-900 p-2 w-full text-white" value={Data.gsm} />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Grade</label>
       <input type="text" name="grade" placeholder="A or B or C" onChange={handleChange} className="border border-zinc-900 p-2 w-full text-white" value={Data.grade} />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Length</label>
       <input type="number" name="length" placeholder="Length in cm " onChange={handleChange} className="border border-zinc-900 p-2 w-full text-white" value={Data.length}  />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Breadth</label>
       <input type="number" name="breadth" placeholder="Breadth in cm" onChange={handleChange} className="border border-zinc-900 p-2 w-full text-white" value={Data.breadth} />
       </div>
       
       <button type="submit" onClick={HandleUpdate} className="bg-primary text-white mt-2 px-4 py-2 rounded-full">Update Notebook</button>
      </div>
    

   
  </div>
  )
}

export default UpdateBook