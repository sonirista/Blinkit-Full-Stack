import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoMdClose } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <div>
      <section  className='bg-white h-full w-full py-2'>
        <button onClick={()=>window.history.back()} className='text-neutral-800 font-bold block w-fit ml-auto'>
        <IoMdClose size={28} />
        </button>
        <div className='container mx-auto px-3 pb-8'>
        <UserMenu/>
        </div>
      
      </section>
     
      </div>
  )
}

export default UserMenuMobile