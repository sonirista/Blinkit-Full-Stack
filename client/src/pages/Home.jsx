import React from 'react'
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile (1).jpg"
import { useSelector } from 'react-redux'
import valideURLConvert from '../utils/valideURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state=> state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()
  const handleRedirectProductListPage = (id, cat) => {
    console.log(id, cat);
  
    const subCategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === id);
    });
  
    if (!subCategory) {
      console.warn("No matching subcategory found for category:", cat, id);
      return; // Exit early or show a message
    }
  
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subCategory.name)}-${subCategory._id}`;
    navigate(url);
    console.log(url);
  };
  

  //   const url =`/${valideURLConvert(cat)}-${id}/${valideURLConvert(subCategory.name)}-${subCategory._id}`
  //   navigate(url)
  //   console.log(url)
          

  // }
  

  return (
    <section className='bg-white'>
      <div className='  container mx-auto'>
        <div className={`w-full h-full min-h-48 bg-green-100 rounded ${!banner &&  "animate-pulse my-2"} `}>
          <img src={banner} className='w-full h-full hidden lg:block' alt='banner'/>
          <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner'/>

        </div>
        <div className='container mx-auto  px-4 my-2 grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2'>
         {
          loadingCategory ? (
            new Array(12).fill(null).map((c,index)=>{
              return (
                <div key={index+"loadingcategory"}  className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                 <div className='bg-blue-100 min-h-8 rounded' ></div>

                 
                </div>
              )
            })
          ) : ( 
            categoryData.map((cat,index)=>{
              return(
              <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListPage(cat._id,cat.name)}>
              <div>
                <img 
                src={cat.image}
                className='w-full h-full object-scale-down'
                />
              </div>
            </div>
              )
            })
            
          )
           
         }
        </div>

      </div>

      {/* display category product */}
      {
        categoryData.map((c,index)=>{
          return (
            <CategoryWiseProductDisplay key={c?._id+"CategorywiseProduct"} id={c?._id} name={c?.name}/>
          
          )
        })
      }
      
    </section>
  )
}

export default Home