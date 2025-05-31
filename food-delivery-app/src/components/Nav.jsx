import React, { useContext, useEffect } from 'react'
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from '../context/UserContext';
import { food_items } from '../food';
import {useSelector} from 'react-redux'

const Nav = () => {

  let items = useSelector(state=>state.cart);

  let {input,setInput,cate,setCate,showCart,setShowCart} = useContext(dataContext)

  useEffect(()=> {
    let newlist = food_items.filter((item) => item.food_name.includes(input) || item.food_name.toLowerCase().includes(input))
    setCate(newlist)
  },[input])

  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
      <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl'>
        <MdFastfood  className='w-[30px] h-[30px] text-green-500'/>
      </div>
      <form action="" onSubmit={(e) => e.preventDefault()} className='bg-white w-[50%] h-[60px] flex items-center px-5 gap-5 rounded-md shadow-md md:w-[70%]'>
        <IoSearch  className='w-[20px] h-[20px] text-green-500'/>
        <input type="text"  placeholder='Search Items... ' className='w-full outline-0 text-[14px] md:text-[20px]' onChange={(e) => setInput(e.target.value)} value={input}  />
      </form>

      <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer' onClick={() => setShowCart(true)}>
        <span className='absolute top-0 right-2 text-[18px] text-green-500 font-bold'>{items.length}</span>
        <LuShoppingBag  className='w-[30px] h-[30px] text-green-500'/>

      </div>
    </div>
  )
}

export default Nav