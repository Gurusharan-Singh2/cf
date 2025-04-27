
import React, { useEffect, useState } from 'react';
import axios from "axios";
import BooksCard from '../components/BooksCard';
import Loader from '../components/Loader';

const AllBooks = () => {
  const [Data, setData] = useState();
  
  useEffect(() => {
    const fetch=async()=>{
     const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-books`);
     setData(response.data.data)
     
    };
    fetch()
    
  },[])
 
  return (
    <div className='bg-zinc-900 h-auto  px-12 py-8'>
       <h4  className='text-3xl text-yellow-100'>All NoteBooks  </h4>
     {!Data && <div className='flex justify-center items-center'>
      <Loader></Loader>
      </div>}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
       
        {Data && Data.map((item,i)=>{
          
          return <div  key={i}>
            <BooksCard item={item}></BooksCard>
            </div>
        })}
      </div>
     
    </div>
  )
}

export default AllBooks