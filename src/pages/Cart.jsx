import React, { useState,useEffect } from 'react'
import Loader from '../components/Loader';
import axios from "axios";
import { BsFillCartDashFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../components/EmptyCart';
import {load} from '@cashfreepayments/cashfree-js'
import { FiMinus } from "react-icons/fi";
<FiMinus />
import { IoMdAdd } from "react-icons/io";


const Cart = () => {
  const [Data,setData]=useState([]);
  const [cashfree, setCashfree] = useState();
  const [quantity,SetQuantity]=useState(1);
  const [OrderId, setOrderId] = useState("")
  const [Total,setTotal]=useState();
  const navigate=useNavigate()
  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-cart`,{headers});
      setData(response.data.cart);
    };
    fetch();
  }, []);
  

  useEffect(() => {
    setTotal(Data.reduce((sum, item) => sum + item.price * quantity, 0));
  }, [Data,quantity]);


  useEffect(() => {
    const initializeSDK = async () => {
      const cf = await load({
        mode: "sandbox",
      });
      setCashfree(cf);
    };
    initializeSDK();
  }, []);

  const HandleSessionId=async()=>{
    try {
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment`,{Amount:Total},{headers});
      setOrderId(response.data.
        order_id);
     
      return response.data.payment_session_id;
      
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const PlaceOrder=async()=>{
    try {
     
        const x = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/place-order`,{order:Data},{headers});
        
        console.log(x);
        navigate('/profile/orderHistory');
        
        
      }catch (error) {
      alert(error.data)
      
    }
  }

  const verifyPayment=async()=>{
    try {
      let res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`,{OrderId:OrderId},{headers})

      if(res && res.data){
        console.log(res.data);
        await PlaceOrder();
        alert("Payment Successfull");
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  

  

  const HandlePayment = async () => {
    try {
      if (!cashfree) {
        alert("Cashfree SDK not initialized. Please try again.");
        return;
      }

      let sessionId = await HandleSessionId();
      if (!sessionId) {
        alert("Failed to get payment session. Please try again.");
        return;
      }

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      // Initiate Payment
      const response = await cashfree.checkout(checkoutOptions);
      // console.log("Payment Iniated"+response);
      
      verifyPayment(OrderId);
      
    } catch (error) {
      console.log("Error in HandlePayment:", error);
    }
  };


  const DeleteCart=async(id)=>{
    try {
      const fetch = async () => {
        const x = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-from-cart/${id}`,{headers});
        alert(x.data.message);
        
      };
      fetch();
      setData((prevData) => prevData.filter((item) => item._id !== id));

      
    } catch (error) {
      alert(error.data)
      
    }
  }
  

  const Increase1=()=>{
    SetQuantity(quantity+1);
  }  
  const Decrease1=()=>{
    SetQuantity(quantity-1);
  }  
  
  
  
  return (
    <div className='bg-zinc-700 min-h-[85vh]'>
       {!Data && <div className='flex justify-center items-center'>
      <Loader></Loader>
      </div>}
      {Data.length===0 && <div className="w-screen h-screen flex justify-center items-center">
      <EmptyCart></EmptyCart> </div>  }
      { Data  && Data.length>0 && (
        <>
        <h1 className='text-5xl font-semibold text-zinc-500 mb-0'>Your Cart</h1>
        {Data.map((item,i)=>{
          return <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i} >
            <img src={item.url} alt="" className='h-[20vh] md:h-[10vh] object-cover' />
            <div className='w-full md:w-auto'>
              <h2 className='text-lg text-zinc-100 font-semibold text-start mt-2 md:mt-0'>Pages : {item.pages}</h2>

            </div>
            <div className='w-full md:w-auto'>
              <h2 className='text-lg flex gap-3 items-center  text-zinc-100 font-semibold text-start mt-2 md:mt-0'> <span className='text-3xl'><FiMinus onClick={Decrease1} /></span>{quantity} <span className='text-3xl'><IoMdAdd onClick={Increase1} />
              </span></h2>

            </div>
            <div className='w-full md:w-auto mt-4 flex items-center justify-between'>
              <h2 className='text-2xl text-zinc-100 font-semibold flex'>₹ {item.price*quantity}</h2>
              <button className='bg-red-100 text-red-500 text-4xl rounded-2xl border border-red-800 p-2 ms-12' onClick={()=>DeleteCart(item._id)}><BsFillCartDashFill /></button>

            </div>
          </div>
        })}
        </>
      )
      } 
      {Data && Data.length>0 && (<>
      <div className='mt-4 w-full flex items-center justify-end pr-4 '>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-3xl text-zinc-200 font-semibold'>
            Total Amount
          </h1>
          <div className='mt-3 flex items-center  justify-between text-xl text-zinc-200'>
            <h2>{Data.length} Notebooks </h2> <h2>{Total}</h2>

          </div>
          <div className='w-[100%] mt-3 '>
            <button className='bg-zinc-100 rounded-full px-4 py-2 text-xl flex justify-center w-full font-semibold border border-primary hover:bg-primary' onClick={HandlePayment}>Place Order</button>
          </div>

        </div>


      </div>


       {/* <div className='mt-4 w-full flex items-center justify-end pr-4 '>
     <div className='p-4 bg-zinc-800 rounded my-2'>
      <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
      <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
        <div class="flex justify-between w-full">
          <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
          <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹ {Total}</p>
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="text-base dark:text-white leading-4 text-gray-800">Discount</p>
          <p class="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
          <p class="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
        </div>
      </div>
      </div>
      </div> */}
      </>)}


    </div>
  )
}

export default Cart