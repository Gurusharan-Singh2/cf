import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

import FavriouteBooksCard from "./FavriouteBooksCard";
import EmptyFavrioute from "./EmptyFavrioute";


const Favrioute = () => {
   const [Data, setData] = useState([]);
   const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-favrioute-books`,{headers});
      setData(response.data.books);
      
      
      
    };
    fetch();
  }, [Data]);
  
  return (<>
  
    {!Data && <div className='flex justify-center items-center'>
      <Loader></Loader>
      </div>}
      {Data.length===0 && <div className="w-full h-full flex justify-center items-center"> <EmptyFavrioute></EmptyFavrioute> </div>  }
      <div className=' grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
       
       
        {Data && Data.length>0 &&  Data.map((item,i)=>{
          
          return <div   key={i}>
           <FavriouteBooksCard item={item} favrioute={true}></FavriouteBooksCard>
            </div>
        })}
        </div>
        
      
      </>)
}

export default Favrioute