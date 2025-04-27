import React, { useEffect,useState } from 'react'
import axios from 'axios'

const PaymentDetail = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  const headers={
    id:localStorage.getItem("id"),
    atoken:localStorage.getItem("token"),
    role:localStorage.getItem("role"),
    email:localStorage.getItem("email"),
    
  };

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getPaymentDetail`,{headers});
      setPaymentDetails(response.data.data.paymentDetail);
     
      
    };
    fetch();
  },[])
  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
    {paymentDetails.map((payment, index) => (
      <div key={index} className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <p><strong>Order ID:</strong> {payment.order_id}</p>
        <p><strong>Amount:</strong> {payment.order_amount} {payment.payment_currency}</p>
        <p><strong>Status:</strong> {payment.payment_status}</p>
        <p><strong>Payment Time:</strong> {new Date(payment.payment_time).toLocaleString()}</p>
        <p><strong>Bank Reference:</strong> {payment.bank_reference}</p>
        <p><strong>Payment Message:</strong> {payment.payment_message}</p>
      </div>
    ))}
  </div>
  )
}

export default PaymentDetail