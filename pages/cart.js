import React, {useMemo} from 'react';
import Wrapper from '@/components/Wrapper';
import CartItem from '@/components/CartItem';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { makePaymentRequest } from '@/utils/api';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const Cart = () => {

    const [loading, setLoading] = useState(false);

    const { cartItems } = useSelector((state) => state.cart)

    const subTotal = useMemo(()=>{
        return cartItems.reduce((total, val) => total + val.attributes.price, 0)
    }, [cartItems])

    const handlePayment = async () => {
        try{
            setLoading(true)
            const stripe = await stripePromise
            const res = await makePaymentRequest("/api/orders", {
                products: cartItems
            })
            await stripe.redirectToCheckout({
                sessionId: res.stripeSession.id
            })
        } catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div>
            <Wrapper>

            {cartItems.length > 0 && (

                <>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                    <div className="text-[28px] md:text-[34px]  my-5 font-semibold leading-tight">
                        Running Shoes
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 py-10">
                    <div className='flex-[2]'>
                    <div className='text-lg font-bold'>
                        CartItem
                    </div>
                    {cartItems.map((item)=>(
                        <CartItem key={item.id} data={item}/>
                    ))}
                    </div>
                    <div className='flex-[2]'>
                    <div className='text-lg font-bold'>
                        Summary
                    </div>

                    <div className="p-5 my-5 text-black shadow-md bg-black/[0.2] rounded-xl">
                        <div className="flex justify-between  text-black  ">
                            <div className="text-md md:text-lg  text-black  font-medium">SUBTOTAL</div>
                            <div className="text-md md:text-lg  text-black  font-medium">{subTotal}</div>
                        </div>
                        <div className="text-sm md: text-md py-5  text-black border-t mt-5">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptatem ipsa expedita assumenda deserunt error voluptatibus. Maxime aliquid qui modi cupiditate unde. Nisi provident dolore beatae et, quasi inventore recusandae sequi veritatis harum magni. Nulla exercitationem facilis eius vitae voluptate, excepturi quidem eligendi non beatae delectus necessitatibus! Soluta, est praesentium.
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-full border bg-black text-white shadow-sm Obg-black text-lg font-medium transition-transform active: scale-95 mb-3
                    hover:opacity-75"
                    onClick={handlePayment}>
                    Checkout!
                    {loading && <img src="/assets/spinner.svg" />}
                    </button>

                    </div>
                </div>
                </>
                )}


            </Wrapper>



        </div>
    );
}

export default Cart;
