import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { convertDiscountedPrice } from '@/utils/helper';

const ProductCard = ({data}) => {
    return (
        <Link href={`/product/${data.attributes.slug}`} className="transform w-fit overflow-hidden my-2 mx-2 duration-200 hover:scale-105 cursor-pointer">
            
                <Image
                    width={400}
                    height={400}
                    src={data.attributes.thumbnail.data.attributes.url}
                    alt={data.attributes.name}
                    className='rounded-lg shadow-md border '
                />
                <div className="mx-2">
                    <h2 className='text-lg bg-transparent my-4 '>{data?.attributes?.name}</h2>
                    <div className="flex items-center max-w-[540px]">
                        <p className='mr-3 text-lg font-semibold'>&#8377;{data?.attributes?.price}</p>

                        {data?.attributes?.orignal_price && (
                            <>
                                <p className='text-black/[0.2]  text-base font-medium line-through'>{data?.attributes?.orignal_price}</p>
                                <p className='ml-auto  text-green-300 text-base font-medium'>
                                    {convertDiscountedPrice(data?.attributes?.orignal_price, data?.attributes?.price)+'% off'}
                                </p>
                            </>
                        )}
                        
                    </div>
                </div>
                
            
        </Link>
    );
}

export default ProductCard;

export async function getStaticProps(){

    const products = await fetchDataFromAPI("/api/products?populate=*")
    
        return{
        props: {products}
        }
    }

