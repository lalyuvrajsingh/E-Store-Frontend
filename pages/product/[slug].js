import React from 'react';
import Wrapper from '@/components/Wrapper';
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel';
import RelatedProducts from '@/components/RelatedProducts';
import { fetchDataFromAPI } from '@/utils/api';
import { convertDiscountedPrice } from '@/utils/helper';
import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice';
import { data } from 'autoprefixer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const ProductDetails = ({product, products}) => {

    const p = product?.data?.[0]?.attributes
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch()


    const notify = () => {
        toast.success('Added to the Cart!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    return(
        <div className='w-full md:py-20'>
            <ToastContainer/>
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full">
                        <ProductDetailsCarousel images={p.image.data}/>
                    </div>
                    <div className="flex-[1] py-3">

                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                        {p.name}
                        </div>

                        <div className="text-md font-semibold my-2">
                            {p.subtitle}
                        </div>

                        <div className="mx-2">
                    <div className="flex items-center max-w-[540px]">
                        <p className='mr-3 text-lg font-semibold'>&#8377;{p.price}</p>

                        {p.orignal_price && (
                            <>
                                <p className='text-black/[0.2] text-base font-medium line-through'>{p.orignal_price}</p>
                                <p className='ml-auto text-green-300 text-base font-medium'>
                                    {convertDiscountedPrice(p.orignal_price, p.price)+'% off'}
                                </p>
                            </>
                        )}
                        
                    </div>
                </div>

                        <div className="text-sm text-black/[0.5]">
                            incl. of taxes
                        </div>

                        <div className="text-sm text-black/[0.5] mb-10">
                            {`Also includes all applicable duties`}
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <div className="font-semibold">
                                Select Size
                            </div>
                            <div className=" align-right text-white/[0.5]">
                                Select Guide
                            </div>
                        </div>
                        
                        <div id='sizesGrid' className="grid grid-cols-3 text-sm gap-2"> 
                        {p.size.data.map((item, i)=>(
                            <div key={item.id} className={`border text-sm border-black/[0.5] bg-white/[0.1] rounded-lg text-center  py-3
                        font-medium ${ item.enabled ? "hover:bg-black/[0.1] cursor-pointer" : "cursor-not-allowed bg-black/[0.1]"}
                        ${selectedSize === item.size ?
                        'bg-black/80 text-white' : ''}`} 
                        onClick={()=>{
                            setSelectedSize(item.size)
                            setShowError(false)
                        }}>
                            {item.size}
                        </div>
                        ))}



                        </div>

                        {showError && (
                            <div className="text-sm my-1 text-red-500">
                                Size selection is required
                            </div>

                        )}

                    <button className="w-full py-4 rounded-full mt-4 bg-black text-white Obg-black text-lg font-medium transition-transform active: scale-95 mb-3
                    hover:opacity-75" 
                    onClick={()=>{
                        if(!selectedSize){
                            setShowError(true)
                            document.getElementById("sizesGrid")
                            .scrollIntoView({
                                block: "center",
                                behavior: "smooth"
                            })
                        } else{
                            dispatch(addToCart({
                                ...product?.data?.[0],
                                selectedSize,
                                oneQuantityPrice: p.price,
                                
                            }))
                            notify()
                        } 
                        
                    }}>
                    Add to Cart
                    </button>

                    <button className="w-full py-4 rounded-full border Obg-black text-lg font-medium transition-transform  active: scale-95 mb-3
                    hover:opacity-75">
                    Buy Now
                    </button>

                    <div>
                        <div className="text-xl mt-5 mb-5 font-semibold">
                            Product Details
                        </div>
                        <div className="markdown text-md mb-5">
                        <ReactMarkdown>
                            {p.description}
                        </ReactMarkdown>
                        </div>
                    </div>

                    </div>
                </div>

                

            </Wrapper>
        </div>
    );
}

export default ProductDetails;



export const getStaticPaths = async () => {
    const products = await fetchDataFromAPI('/api/products?populate=*');
    const paths = products.data.map((p)=>({
        params: {
            slug: p.attributes.slug
        }
    }))

    return {
    paths,
    fallback: false, // or 'blocking' or true depending on your requirements
    };

};



    export async function getStaticProps({params}){
        const product = await fetchDataFromAPI(`/api/products?populate=*&filters[slug][$eq]=${params.slug}`)
        const products = await fetchDataFromAPI(`/api/products?populate=*&[filters][categories][slug][$eq]=${params.slug}`)

        return {
        props: {
        product,
        products
        },
    };

    };
    
 
