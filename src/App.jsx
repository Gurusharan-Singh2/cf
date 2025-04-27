import Footer from "./components/Footer"
import './App.css'
import Navbar from "./components/Navbar"
import AllBooks from "./pages/AllBooks"
import Home from "./pages/Home"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import GetBook from "./components/GetBook"
import { useDispatch } from "react-redux"
import { authActions } from "./store/auth"
import { useEffect } from "react"
import Favrioute from "./components/Favrioute"
import OrderHistory from "./components/OrderHistory"
import Settings from "./components/Settings"
import AllOrders from "./components/AllOrders"
import AddNewBook from "./components/AddNewBook"
import UpdateBook from "./components/UpdateBook"
import PaymentDetail from "./components/PaymentDetail"



function App() {

  const dispatch=useDispatch();
  
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token")&&
      localStorage.getItem("role") &&
      localStorage.getItem("email")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])
 

  return (
  < >
  <BrowserRouter>
  <Navbar></Navbar>
  <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route  path="/all-books" element={<AllBooks/>}/>
    <Route  path="/cart" element={<Cart/>}/>
    <Route  path="/profile" element={<Profile/>}>

       <Route path="/profile/Favrioute" element={<Favrioute/>}/>
       <Route path="/profile/all-orders" element={<AllOrders/>}/>
       <Route path="/profile/add-new-notebook" element={<AddNewBook/>}/>
       <Route path="/profile/orderHistory" element={<OrderHistory/>}/>
       <Route path="/profile/setting" element={<Settings/>}/>
    </Route>
    <Route  path="/signup" element={<Signup/>}/>
    <Route  path="/login" element={<Login/>}/>
    <Route  path="/get-book/:id" element={<GetBook/>}/>
    <Route  path="/update-book/:bookid" element={<UpdateBook/>}/>
    <Route  path="/getPaymentDetail" element={<PaymentDetail/>}/>

  
  </Routes>
  <Footer></Footer>
  </BrowserRouter>


 
  
  
  </>
  )
}

export default App
