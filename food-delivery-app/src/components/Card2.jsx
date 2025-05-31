import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { RemoveItem, IncreaseQty, DecreaseQty } from '../redux/cartSlice';

const Card2 = ({ name, id, price, image, qty }) => {
  const dispatch = useDispatch();

  return (
    <div className='w-full h-[120px] shadow-lg p-2 flex justify-between items-center rounded-lg bg-white'>
      {/* Left Section */}
      <div className='flex gap-5 h-full w-[70%]'>
        <div className='w-[120px] h-full overflow-hidden rounded-lg'>
          <img src={image} alt="food" className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='text-lg text-gray-600 font-semibold'>{name}</div>
          <div className='w-[110px] h-[40px] bg-slate-100 flex rounded-lg overflow-hidden shadow font-semibold border border-green-400'>
            <button
              className='w-[30%] h-full bg-white flex justify-center items-center text-green-500 cursor-pointer hover:bg-gray-200'
              onClick={() => dispatch(DecreaseQty(id))}
            >-</button>
            <span className='w-[40%] h-full flex justify-center items-center text-green-600'>{qty}</span>
            <button
              className='w-[30%] h-full bg-white flex justify-center items-center text-green-500 cursor-pointer hover:bg-gray-200'
              onClick={() => dispatch(IncreaseQty(id))}
            >+</button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className='flex flex-col justify-start items-end gap-6'>
        <span className='text-green-400 font-semibold text-xl'>{price * qty}/-</span>
        <RiDeleteBin6Line
          className='text-red-500 w-[25px] h-[25px] text-xl cursor-pointer hover:text-red-700'
          onClick={() => dispatch(RemoveItem(id))}
        />
      </div>
    </div>
  );
};

export default Card2;
