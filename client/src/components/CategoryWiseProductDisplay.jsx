import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummeryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import valideURLConvert from '../utils/valideURLConvert'


const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
   
    const loadingCardNumber = new Array(6).fill(null)
    

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }

            })
            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)

            }
            console.log(responseData)

        } catch (error) {
            AxiosToastError(error)

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200

    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200

    }

    
   
  
  const handleRedirectProductListPage = () => {
   
  
    const subCategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === id);
    });
  
    if (!subCategory) {
      console.warn("No matching subcategory found for category:", name, id);
      return; // Exit early or show a message
    }
  
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subCategory?.name)}-${subCategory?._id}`;
    return url
  };
  const redirectURL = handleRedirectProductListPage()

    
    return (

        <div>
            <div className='container mx-auto  p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link  to={redirectURL} className='text-green-700 hover:text-green-800 font-semibold'>See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='flex  gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {
                        loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategorywiseProductDisplay123" + index} />
                            )
                        })

                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct data={p} key={p._id + "CategorywiseProductDisplay" + index} />
                            )
                        })
                    }



                </div>
                <div className=' w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between '>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full '><FaAngleLeft /></button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white  hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg'><FaAngleRight /></button>
                </div>
            </div>
        </div>

    )
}

export default CategoryWiseProductDisplay