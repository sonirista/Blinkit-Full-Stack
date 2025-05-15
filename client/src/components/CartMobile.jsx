import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaShoppingCart } from 'react-icons/fa'
import DisplayPriceInRupees from '../utils/DisplayPriceRupees'
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartMobileLink = () => {
    const { totalPrice , totalQty} = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
  return (
    <>
    {
       cartItem[0] && (
        <div className='sticky bottom-4 p-2'>
        <div className='bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden'>
      <div className='flex items-center gap-2'>
          <div className='p-2 bg-green-500 rounded w-fit'>
            <FaShoppingCart />
          </div>
          <div className='text-xs'>
          <p>{totalQty}items</p>
          <p>{DisplayPriceInRupees(totalPrice)}</p>

          </div>
      </div>

     <Link to={"/cart"} className='flex items-center gap-1'>
     <span className='text-sm'>View Cart</span>
     <AiFillCaretRight />
     </Link>

    </div>

    </div>
       )
    }
    
    </>
       
   
  )
}

export default CartMobileLink