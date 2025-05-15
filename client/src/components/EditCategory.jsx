import React, { useState } from 'react'

import { IoClose } from "react-icons/io5";

import uploadImage from '../utils/UploadImage.js';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditCategory = ({close,fetchData,data: categoryData}) => {
    const [data, setData] = useState({
        _id : categoryData?._id ||'',
        name: categoryData?.name || '',
        image: categoryData?.image || ''
      })
      
        const [loading,setLoading] = useState(false)
        const handleOnChange = (e) =>{
            const {name,value} = e.target
            setData((preve)=>{
                  return{
                    ...preve,
                    [name] : value
                  }
            })
        }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data

            })
            const {data: responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
            
        } catch (error) {
            AxiosToastError(error)
            
        } finally{
            setLoading (false)
        }
    }
    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files [0]

        if(!file){
            return

        }
        setLoading(true)
        const response = await uploadImage(file)
        const {data : ImageResponse } = response
        setLoading(false)

        if (ImageResponse?.data?.url) {
            setData((prev) => {
                return {
                    ...prev,
                    image: ImageResponse.data.url,  // Update the image state here
                };
            });
    
            console.log('Uploaded Image URL:', ImageResponse.data.url);  // Logging the URL correctly
        } else {
            toast.error('Image upload failed');
        }
        

        console.log(ImageResponse.data.url);

        

    }
  return (
    <section className='fixed top-0 left-0 bottom-0 p-4 right-0 bg-neutral-800/60 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 rounded  '>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Update Category</h1>
            <button onClick={close} className='w-fit block ml-auto'>
            <IoClose size={25}/>
            </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubmit} >
                <div className='grid  gap-1'>
                    <label id='categoryName'>Name</label>
                    <input type='text' id='categoryName' placeholder='Enter Category Name' value={data.name} name='name' onChange={handleOnChange} className='bg-blue-50 p-2 border border-blue-100 focus-within:border-yellow-300 outline-none rounded'/>
                </div>
                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                    <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded outline-none'>
                        {
                            data.image ? (
                              <img
                                alt='category'
                                src={data.image}
                                className='w-full h-full object-scale-down'
    
                              />
                            ): (
                                <p className='text-sm text-neutral-500'>No Image</p>
                            )
                        }
                        
    
                    </div>
                    <label htmlFor='uploadCategoryImage'>
                    <div  className={`
                    ${!data.name ? "bg-gray-300" : "border-amber-400 hover:bg-amber-400" }
                         px-4 py-2 rounded cursor-pointer border font-medium
                        `}>
                            {
                                loading ? "Loading..." : "Upload Image"
                            }
                            </div>
                        <input  onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                    </label>
                    
                    </div>
                </div>
    
                <button className={
                    `
                      ${data.name && data.image ? "bg-amber-400" : "bg-slate-300"}
                      py-2 font-semibold  hover:bg-amber-300 
    
                    `
                }>Update Category</button>
            </form>
       
        </div>
    
       </section>
  )
}

export default EditCategory