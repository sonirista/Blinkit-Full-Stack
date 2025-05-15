import { createContext,useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummeryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { PricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";


export const GlobalContext = createContext(null)
export const useGlobalContext = ()=> useContext(GlobalContext)

const  GlobalProvider = ({children})=>{
    const dispatch = useDispatch()
    const[totalPrice,setTotalPrice] = useState(0)
    const[notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
    const [totalQty,setTotalQty]  = useState(0)
    const cartItem = useSelector(state=> state.cartItem.cart)
    const user = useSelector(state => state?.user)

    const fetchCartItem = async()=>{
        try {
          const response = await Axios({
            ...SummaryApi.getCartItem
          })
          const { data : responseData} = response
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log(responseData)
          }
        } catch (error) {
          console.log(error)
          
        }
       }
       const updateCartItem = async(id,qty)=>{
        try {
          const response = await Axios({
            ...SummaryApi.updateCartItemQty,
            data : {
              _id  : id,
              qty : qty
            }
          })
          const {data : responseData} = response

          if(responseData.success){
            // toast.success(responseData.message)
            fetchCartItem()
            return responseData
          }
        } catch (error) {
          
          AxiosToastError(error)
          return error
          
        }
       }
       
       const deleteCartItem = async(cartId)=>{
        try {
          const response = await Axios({
            ...SummaryApi.deleteCartItem,
            data : {
              _id : cartId
            }
          })
          const {data:responseData} = response
          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }
          
        } catch (error) {
          AxiosToastError(error)
        }
       }
    
     useEffect(()=>{
            const qty = cartItem.reduce((preve,curr)=>{
                return preve + curr.quantity 
    
            },0)
            setTotalQty(qty)
            const tPrice = cartItem.reduce((preve,curr)=>{
              const priceAfterDiscount = PricewithDiscount(curr?.productId?.price,curr?.productId?.discount)
                return preve + (priceAfterDiscount * curr.quantity)
            },0)
            setTotalPrice(tPrice)
            

            const notDisCountPrice = cartItem.reduce((preve,curr)=>{
                return preve + (curr?.productId?.price * curr.quantity)
            },0)
            setNotDiscountTotalPrice(notDisCountPrice)
    
        },[cartItem])

       

        const handleLogOut = ()=>{
          localStorage.clear()
          dispatch(handleAddItemCart([]))
        }
        const fetchAddress = async()=>{
          try {
            const response = await Axios({
              ...SummaryApi.getAddress
            })
            const {data : responseData} = response
            if(responseData.success){
              dispatch(handleAddAddress(responseData.data))
            }
          } catch (error) {
            AxiosToastError(error)
            
          }
        }
        useEffect(()=>{
          fetchCartItem()
          handleLogOut()
          fetchAddress()
        },[user])

    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQty,
            notDiscountTotalPrice
        }}>
            {children}
        </GlobalContext.Provider>
    )

}
export default GlobalProvider
