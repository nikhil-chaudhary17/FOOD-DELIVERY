import React from 'react'
import { LuLeafyGreen } from "react-icons/lu"
import { GiChickenOven } from "react-icons/gi"
import { AddItem } from '../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Card({ name, image, id, price, type }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart)

  // Check if the item already exists in the cart
  const isInCart = cartItems.some(item => item.id === id)

  const handleAdd = () => {
    if (isInCart) {
      toast.warn("Item is already in the cart", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      })
    } else {
      dispatch(AddItem({ id, name, price, image, qty: 1 }))
      toast.success("Item added to cart", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      })
    }
  }

  return (
    <div className='w-[300px] h-[400px] p-3 bg-white rounded-lg flex flex-col gap-3 shadow-lg hover:border-2 border-green-300'>
      <div className='w-full h-[60%] overflow-hidden rounded-lg'>
        <img src={image} alt="Test Image" className='object-cover w-full h-full' />
      </div>

      <div className='text-2xl font-semibold'>{name}</div>

      <div className='w-full flex justify-between items-center'>
        <div className='text-green-500 text-lg font-bold'>Rs {price}/-</div>
        <div className='flex justify-center items-center gap-2 text-green-500 font-semibold text-l'>
          {type === "veg" ? <LuLeafyGreen /> : <GiChickenOven />}
          <span>{type}</span>
        </div>
      </div>

      <div>
        <button
          className='bg-green-500 p-3 w-full rounded-lg text-white hover:bg-green-400 transition-all'
          onClick={handleAdd}
        >
          Add to Dish
        </button>
      </div>
    </div>
  )
}

export default Card
