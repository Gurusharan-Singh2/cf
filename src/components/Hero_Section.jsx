import React from 'react'
import  IMG from "../assets/AdobeExpress-file-ezgif.com-png-to-webp-converter.webp"
import { useNavigate } from 'react-router-dom';


const Hero_Section = () => {
  const navigate=useNavigate();
  return (
    <div className='h-[75vh] flex flex-col gap-20 md:flex-row md:gap-0'>
      <div className='w-full lg:w-3/6 flex flex-col items-center mt-3 md:mt-0 lg:items-start justify-center'>
      <h1 className='text-4xl lg:text-6xl font-semibold text-primary text-center lg:text-left'>Notebooks Crafted for Thinkers & Dreamers</h1>
      <p className='mt-4 text-xl text-white text-center lg:text-left'>Fuel your imagination, organize your world, and craft your next big idea with our premium notebooks</p>
     <div className='mt-8'>
     <button className='text-white text-xl lg:text-2xl font-semibold border border-primary px-10 py-4 hover:bg-primary hover:text-black rounded-full' onClick={()=>navigate('/all-books')}>Discover Notebooks</button>
     </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
      <img className=''  src={IMG} alt="" /></div>

    </div>
  )
}

export default Hero_Section