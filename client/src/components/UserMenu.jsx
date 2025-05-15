import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Devider from './Devider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummeryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { FaExternalLinkAlt } from "react-icons/fa";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })
      if (response.data.success) {
        if (close) {
          close()
        }

        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        window.history.back()
        navigate("/")

      }
    } catch (error) {
      AxiosToastError(error)

    }
  }
  const handleClose = () => {
    if (close) {
      close()
    }


  }
  return (
    <div>
      <div className='font-semibold'>My account</div>
      <div className='text-sm flex items-center gap-1'><span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}<span className='text-medium text-red-500'>{user.role === "ADMIN" ?"(Admin)":""}</span></span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-yellow-400'><FaExternalLinkAlt size={15} />
        </Link>
      </div>
      <Devider />
      <div className='text-sm grid gap-1'>
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1 font-bold'>Category</Link>
          )
        }
         {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1 font-bold'>Sub Category</Link>
          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1 font-bold'>Upload Product</Link>
           
          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1 font-bold'>Product</Link>
          )
        }

       
      
       
        
        <Link onClick={handleClose} to={"/dashboard/myOrders"} className='px-2 hover:bg-orange-200 py-1 font-bold'>My Orders</Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className='px-2  hover:bg-orange-200 py-1 font-bold '>Save Address</Link>
        <button onClick={handleLogout} className='text-left px-2 bg-red-300  hover:bg-orange-200 py-1 font-bold'>Log Out</button>

      </div>
    </div>
  )
}

export default UserMenu