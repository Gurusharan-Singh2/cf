import {configureStore} from '@reduxjs/toolkit'
import authReducers from './auth'
const store=configureStore({
  reducer:{
    auth:authReducers
  },
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools only in development  
})
export default store