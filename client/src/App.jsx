
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/FetchUserDetails';
import {setUserDetails} from './store/userSlice';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummeryApi';
import {handleAddItemCart} from './store/cartProduct.js'
import GlobalProvider from './provider/GlobalProvider.jsx';
import { FaShoppingCart } from "react-icons/fa";
import CartMobileLink from './components/CartMobile.jsx';


function App() {
  const dispatch = useDispatch()
  const location = useLocation()
 
  const fetchUser = async () => {
    
      const userData = await fetchUserDetails()
      
        dispatch(setUserDetails(userData.data))
      
    
  }
  const fetchCategory = async()=>{
      try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
          ...SummaryApi.getCategory

        })
        const{data : responseData} = response 
        if(responseData.success){
         
          dispatch(setAllCategory(responseData.data))
        
        }
       
        
      } catch (error) {
        
      }finally{
        dispatch(setLoadingCategory(false))
      
      }
    }
    const fetchSubCategory = async()=>{
      try {
        
        const response = await Axios({
          ...SummaryApi.getSubCategory

        })
        const{data : responseData} = response 
        if(responseData.success){
         
          dispatch(setAllSubCategory(responseData.data))
        
        }
       
        
      } catch (error) {
        
      }finally{
      
      }
    }
   

   
   

  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
   
  },[])
  console.log()
  return (
    <GlobalProvider>
    <Header/>
   <main className='min-h-[70vh]'>
    <Outlet/>
    
   </main>
   <Footer/>
   <Toaster/>
   {
    location.pathname !== '/checkout' && (
      <CartMobileLink/>
    )
   }
   
   </GlobalProvider>
  )
}


export default App
