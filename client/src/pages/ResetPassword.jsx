import React, { useEffect, useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FiEye } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummeryApi'

import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'


const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState (false)
    const validValue = Object.values(data).every(el => el)
    useEffect(()=>{
        if(!(location?.state?.data?.success)){

            navigate("/") 
        }
        if(location?.state?.email){
            setData((preve)=>{
                return {
                   ...preve,
                   email : location?.state?.email
                }
            })

        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }

        })
    }
    console.log("reset password",data)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.newPassword !== data.confirmPassword){
             toast.error("New password and confirm password must be same")
             return
        }



        try {
            const response = await Axios({
                ...SummaryApi.resetPassword, //change  
                data: data

            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email : "",
                    newPassword : "",
                    confirmPassword : ""
                

                })
               
            }


        } catch (error) {
            AxiosToastError(error)

        }

    }


  return (
    <section className=' w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg mb-2'>Enter Your  Password</p>


                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>  
                        <div className='grid gap-1'>
                                                <label htmlFor='newPassword'>New Password:</label>
                                                <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-400'>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        id='password'
                                                        className='w-full outline-none'
                                                        name='newPassword'
                                                        value={data.newPassword}
                                                        onChange={handleChange}
                                                        placeholder='Enter Your new Password '
                                                    />
                                                    <div onClick={() => setShowPassword(preve => !preve)} className='curser-pointer'>
                                                        {
                                                            showPassword ? (
                                                                <FiEye />
                                                            ) : (
                                                                <FaRegEyeSlash />
                                                            )
                                                        }
                        
                        
                                                    </div>
                                            </div>
                    </div>
                    <div className='grid gap-1'>
                                                <label htmlFor='confirmPassword'>Confirm Password:</label>
                                                <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-400'>
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        id='password'
                                                        className='w-full outline-none'
                                                        name='confirmPassword'
                                                        value={data.confirmPassword}
                                                        onChange={handleChange}
                                                        placeholder='Enter Your confirm Password'
                                                    />
                                                    <div onClick={() => setShowConfirmPassword(preve => !preve)} className='curser-pointer'>
                                                        {
                                                            showConfirmPassword ? (
                                                                <FiEye />
                                                            ) : (
                                                                <FaRegEyeSlash />
                                                            )
                                                        }
                        
                        
                                                    </div>
                                            </div>
                    </div>
                    <button disabled={!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} bg-gray-500 text-white py-2 rounded font-semibold my-3 tracking-wide`}>Change Password</button>

                </form>
                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-900'>Login</Link>
                </p>
            </div>

        </section>
  )
}

export default ResetPassword