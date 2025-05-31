import React, { useContext } from 'react'
import Nav from '../components/Nav'
import Categories from '../components/Category'
import Card from '../components/Card'
import { food_items } from '../food'
import { dataContext } from '../context/UserContext'
import { RxCross1 } from "react-icons/rx";
import Card2 from '../components/Card2'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ClearCart } from '../redux/cartSlice'



const Home = () => {

    let dispatch = useDispatch()

    let items = useSelector(state => state.cart);

    let subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
    let deliveryFee = 40;
    let taxes = subtotal * 1.5 / 100;
    let total = Math.floor(subtotal + taxes + deliveryFee);

    let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext)

    const filter = (category) => {
        if (category === "All") {
            setCate(food_items)
        }
        else {
            let newList = food_items.filter((item) => (item.food_category === category))
            setCate(newList)
        }
    }

    return (
        <div className='bg-slate-200 w-[100%] min-h-screen overflow-auto scrollbar-hide'>
            <Nav />
            {!input ? <div className='flex flex-wrap justify-center items-center w-[100%] gap-5'>
                {Categories.map((item) => {
                    return (
                        <div key={item.id} className='w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start font-semibold text-[20px] text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200' onClick={() => filter(item.name)} >
                            {item.icon}
                            {item.name}
                        </div>
                    );
                })}

            </div> : null}

            <div className='flex justify-center items-center flex-wrap gap-5 w-full px-5 pt-8 pb-8'>
                {cate.length > 0 ? (
                    cate.map((item) => (
                        <Card key={item.id} name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
                    ))
                ) : (
                    <div className="text-xl text-gray-600 font-semibold mt-10">
                        No dish found.
                    </div>
                )}
            </div>

            <div className={`w-full md:w-[40vw] h-[100%] flex flex-col overflow-auto items-center fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 ${showCart ? "translate-x-0" : "translate-x-full"}`}>
                <header className='w-[100%] flex justify-between items-center'>
                    <span className='text-green-400 font-semibold text-[18px]'>Order items</span>
                    <RxCross1 className='text-green-400 font-semibold text-[18px] w-[30px] h-[30px] cursor-pointer hover:text-gray-600' onClick={() => setShowCart(false)} />
                </header>
                <div className='w-full mt-8 flex flex-col gap-5'>
                    {items.map((item) => (
                        <Card2
                            key={item.id}
                            name={item.name}
                            id={item.id}
                            qty={item.qty}
                            image={item.image}
                            price={item.price}
                        />
                    ))
                    }
                </div>

                { items.length > 0 ?
                    <>
                        <div className='w-full mt-7 border-t-2 border-b-2 border-gray-400 flex flex-col gap-4 p-8'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-xl font-semibold text-gray-600'>Subtotal</span>
                                <span className='text-lg text-green-400 font-semibold'>Rs {subtotal}/-</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-xl font-semibold text-gray-600'>Delivery fee</span>
                                <span className='text-lg text-green-400 font-semibold'>Rs {deliveryFee}/-</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-xl font-semibold text-gray-600'>Taxes</span>
                                <span className='text-lg text-green-400 font-semibold'>Rs {taxes}/-</span>
                            </div>

                        </div>
                        <div className='w-full flex justify-between items-center p-9'>
                            <span className=' font-semibold text-gray-600 text-2xl'>Total</span>
                            <span className=' text-green-400 font-semibold text-2xl'>Rs {total}/-</span>
                        </div>

                        <button className='bg-green-500 p-3 w-[80%] rounded-lg text-white hover:bg-green-400 transition-all'onClick={() => {toast.success("Order placed",{autoClose: 1500}); dispatch(ClearCart())}}>Place Order</button>
                    </> :
                    <div className='flex justify-center items-center h-[60vh] w-full'>
                        <h2 className='text-2xl font-bold text-gray-400 text-center'>Your Cart is Empty</h2>
                    </div>
                }
            </div>

        </div>
    )
}

export default Home