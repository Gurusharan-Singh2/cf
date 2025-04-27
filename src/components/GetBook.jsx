import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const GetBook = () => {
  const { id } = useParams();
  const navigate =useNavigate()
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const Bookid= useParams();
  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    bookid:Bookid.id
  }
 
  

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-book/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [id]);
  const HandleFavrioute=async()=>{
    try {
      const fetch = async () => {
        const x = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/add-book-to-favrioute`,{},{headers});
        alert(x.data.message);
        
      };
      fetch();

      
    } catch (error) {
      alert(error.data)
      
    }
  }
  
const HandleCart=async()=>{
    try {
      const fetch = async () => {
        const x = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/add-to-cart`,{},{headers});
        alert(x.data.message);
        
      };
      fetch();

      
    } catch (error) {
      alert(error.data)
      
    }
  }  




  //  Admin Controllers
  const HandleDelete=async()=>{
    try {
      const fetch = async () => {
        const x = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-book`,{headers});
        alert(x.data.message);
        navigate('/all-books')


        
      };
      fetch();

      
    } catch (error) {
      alert(error.data)
      
    }
  }

  return (
    <>
      {!Data && (
        <div className="h-screen bg-zinc-800 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {Data && (
        <div className="px-4 md:px-8 py-6 bg-zinc-900 flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="bg-zinc-800 rounded p-4 h-auto md:h-[60vh] lg:h-[88vh] w-full md:w-1/2 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-around">
            <img src={Data.url} className="h-[40vh] md:h-[45vh] max-w-[350px] lg:h-[70vh] mt-5 object-contain" alt="Book Cover" />
            {isLoggedIn && role === "user" && (
              <div className="flex md:flex-col mt-10 md:mt-0 lg:mt-5 gap-6">
                <button className="bg-white rounded-full text-3xl text-red-500 p-2" onClick={HandleFavrioute}>
                  <FaHeart />
                </button>
                <button className="bg-white rounded-full text-3xl text-blue-600 p-2" onClick={HandleCart}>
                  <FaCartPlus />
                </button>
              </div>
            )}
            {isLoggedIn && role === "admin" && (
              <div className="flex md:flex-col mt-10 md:mt-0 lg:mt-5 gap-6">
                <NavLink to={`/update-book/${Bookid.id}`} className="bg-white rounded-full text-3xl text-green-500 p-2">
                <FaEdit />
                </NavLink>
                <button className="bg-white rounded-full text-3xl text-red-600 p-2"
                onClick={HandleDelete}>
                <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="text-white p-4 w-full md:w-1/2">
            <h2 className="text-lg md:text-xl lg:text-2xl my-2 font-semibold">
              Class Fellow Premium Notebook – The Perfect Companion for Your Ideas!
            </h2>
            <p className="my-2 py-2.5 px-1 text-sm md:text-base">
              Take your note-taking experience to the next level with the Class Fellow Premium Notebook – designed for students, professionals, and creative minds who demand quality, style, and durability.
              <br /> <br />
              ✨ Why You’ll Love It?
              <br />✅ Ultra-Smooth {Data.grade} Grade Pages – Enjoy a seamless writing experience with crisp, high-quality paper.
              <br />✅ Perfect Thickness ({Data.gsm} gsm) – No more ink smudging or bleed-through, even with gel or fountain pens.
              <br />✅ Available in {Data.pages} Pages – More space for your thoughts, ideas, and notes.
              <br />✅ Strong & Stylish Cover – Durable yet elegant, making it perfect for daily use.
              <br />✅ Smart Binding (Hardbound) – Designed for easy flipping and long-lasting durability.
              <br />✅ Versatile Page Options – Choose from ruled, plain, grid, or dotted pages to match your needs.
              <br />📚 Where Productivity Meets Perfection!
              <br />
              From classroom notes to office meetings, Class Fellow Notebook is your go-to choice for organized, clutter-free writing. Get yours today and experience the joy of smooth writing! ✨✍️
            </p>
            <div className="flex justify-between">
            <p className="text-lg md:text-xl font-semibold">
              Price: <span className="text-green-400">₹{Data.price}</span>
            </p>
            <p className="text-lg md:text-xl font-semibold">
              Dimension: <span className="text-gray-100"> <span className="text-primary">{Data.length}X{Data.breadth}</span> Length and Breadth</span>
            </p>

            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default GetBook;
