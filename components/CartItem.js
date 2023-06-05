import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri'
import Image from 'next/image';
import { updateCart, removeFromCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';



const CartItem = ({data}) => {

    const p = data.attributes

    const dispatch = useDispatch()

    const updateCartItem=(e, key)=>{
        let payload ={
            key,
            val: key === "quanity" ? parseInt(e.target.value) : e.target.value,
            id: data.id
        }
        dispatch(updateCart(payload))
    }
    return (

        
        
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            <div className="shrink-0 aspect-square w-[50px]  md:w-[120px]"> 
                <Image
                    width={120}
                    height={120}
                    src={p.thumbnail.data.attributes.url}
                    alt={p.name}
                />
            </div>

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-xl font-semibold Otext-black/[0.8]">
                        {p.name}
                    </div> 

                    <div className="text-sm md:text-md font-medium text-black/[0.65] block md:hidden">
                        {p.subtitle}
                    </div> 

                    <div className="text-sm md:text-md font-medium text-black/[0.65] mt-2">
                        MRP : &#8377; {p.price}
                    </div> 

                </div>

                <div className="text-sm md:text-md font-medium text-black/[0.65] block">
                        {p.subtitle}
                </div> 

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 m:gap-10 Otext-black/[0.5] text-sm md:text-md">
                        <div className='flex items-center gap-1'>
                            <div className="font-semibold text-black/[0.5]">Size:</div>
                            <select className='text-black/[0.5] hover:text-white'
                            onChange={(e)=> updateCartItem(e, "SelectedSize")}>
                            {p.size.data.map((item, i)=>(
                                <option 
                                key={i} 
                                disabled={!item.enabled ? true : false} 
                                value={item.size}
                                selected={data.selectedSize === item.sizd}
                                >{item.size}
                                </option>
                            ))}
                            </select>
                        </div> 


                        <div className='flex items-center gap-1'>
                            <div className="font-semibold text-black/[0.5]">Quantity:</div>
                            <select className='text-black/[0.5] hover:text-white'
                            onChange={(e)=> updateCartItem(e, "quantity")}>

                                {Array.from({length: 10}, (_, i) => i + 1).map((q,i) => {
                                    return(
                                        <option 
                                        key={i} 
                                        value={q}
                                        selected={data.quantity === q}
                                        >{q}</option>
                                    )
                                })}
                            </select>
                        </div> 


                    </div>

                    <RiDeleteBin6Line className="cursor-pointer text-black/[0.5]
                        hover:text-white text-[16px] md:text-[20px]"
                    onClick={()=> dispatch(removeFromCart({id: data.id}))}/>
                </div>

            </div>
        </div>
    );
}

export default CartItem;
