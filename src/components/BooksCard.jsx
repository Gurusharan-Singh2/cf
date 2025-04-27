import React from 'react'
import { NavLink } from 'react-router-dom'

const BooksCard = ({item}) => {
 
  
  
  return ( <>
   <NavLink to={`/get-book/${item._id}`}>
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <div className='bg-white rounded flex items-center justify-center'><img src={item.url} alt="" className='h-[42vh]' /></div>
      <div className='flex justify-between items-center' >
      <h2 className='flex my-3 text-lg text-green-400 font-semibold '>Price :₹<p>{item.price}</p> </h2>
      <h2 className='text-sm text-white'>{item.pages} Pages</h2>
      </div>
    </div>

</NavLink>
  </>
   
  )
}

export default BooksCard