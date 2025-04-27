import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-gray-200 py-8 ">
  <div className="container mx-auto px-2">
   
    <div className="flex flex-col md:flex-row justify-around items-center text-center md:text-left space-y-6 md:space-y-0">
     
      <div>
        <h2 className="text-2xl font-semibold">CLASS FELLOW</h2>
        <p className="text-gray-400 mt-2 max-w-sm">
          Providing quality services since 2025. We bring you the best experience with our products.
        </p>
      </div>

     
      <div className="flex space-x-6 text-gray-400 pr-6">
        <a href="#" className="hover:text-white transition-all duration-300">Home</a>
        <a href="#" className="hover:hover:text-white   transition-all duration-300">About Us</a>
        <a href="#" className="hover:hover:text-white  transition-all duration-300">Services</a>
        <a href="#" className="hover:hover:text-white  transition-all duration-300">Contact</a>
      </div>

      
     
    </div>

    
    <div className="border-t border-gray-700 my-6"></div>

   
    <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left">
      <p className="text-gray-400 text-sm">&copy; 2025 YourCompany. All rights reserved.</p>

    
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-gray-400 transition-all duration-300">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="hover:text-gray-400 transition-all duration-300">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-gray-400 transition-all duration-300">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-gray-400 transition-all duration-300">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer