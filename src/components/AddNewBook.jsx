import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddNewBook = () => { 
 const navigate= useNavigate()
  
  const [formData, setFormData] = useState({
  
  price: "",
  pages: "",
  gsm: "",
  grade: "",
  length: "",
  breadth: "",
  image: null,
});


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


const headers={
  id:localStorage.getItem("id"),
  atoken:localStorage.getItem("token"),
  role:localStorage.getItem("role"),
  email:localStorage.getItem("email"),
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key === "image") {
      formDataToSend.append("image", value); 
    } else {
      formDataToSend.append(key, value);
    }
  });




  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/add-book`,
      formDataToSend,
      { headers }
    );
    alert(response.data.message);
    navigate('/all-books');
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error);
    alert(error.response ? error.response.data.message : "Upload failed");
  }
};





return (
  <div className="h-[100%] p-0 md:p-4">
    <h2 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Add Notebook</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='p-4 bg-zinc-800 rounded'>
       <div>
        <label htmlFor="" className='text-zinc-400'>Price</label>
        <input type="number" name="price"  onChange={handleChange} className="border border-zinc-900 p-2 w-full" />
       </div>

       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Pages</label>
       <input type="number" name="pages"  onChange={handleChange} className="border border-zinc-900 p-2 w-full" />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>GSM</label>
       <input type="text" name="gsm" placeholder="Between 30-60" onChange={handleChange} className="border border-zinc-900 p-2 w-full" />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Grade</label>
       <input type="text" name="grade" placeholder="A or B or C" onChange={handleChange} className="border border-zinc-900 p-2 w-full" />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Length</label>
       <input type="text" name="length" placeholder="Length in cm " onChange={handleChange} className="border border-zinc-900 p-2 w-full" />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>Breadth</label>
       <input type="text" name="breadth" placeholder="Breadth in cm" onChange={handleChange} className="border border-zinc-900 p-2 w-full" />
       </div>
       <div className='mt-4'>
       <label htmlFor="" className='text-zinc-400'>File</label>
       <input type="file" name='image'   onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="border border-zinc-900 p-2 w-full" />
       </div>
       <button type="submit" className="bg-primary text-white mt-2 px-4 py-2 rounded-full">Add Notebook</button>
      </div>
    </form>

   
  </div>
);
}


export default AddNewBook