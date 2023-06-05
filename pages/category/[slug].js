import React from 'react';
import Wrapper from '@/components/Wrapper';
import ProductCard from '@/components/ProductCard';
import { fetchDataFromAPI } from '@/utils/api';


const Category = ({category, products, slug}) => {
    
    return (
        <div className='w-full md:py-20'>
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Running Shoes
                    </div>
                </div>
                {/************************* Product Grid *********************************/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 my-14 mx-auto md:px-0 ">
                    {/**<ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>**/}
                </div>
                {/************************* Product Grid *********************************/}
            </Wrapper>
        </div>
    );
}

export default Category;


export const getStaticPaths = async () => {
    const category = await fetchDataFromAPI('/api/categories?populate=*');
    const paths = category.data.map((c)=>({
        params: {
            slug: c.attributes.slug
        }
    }))

    return {
    paths,
    fallback: false, // or 'blocking' or true depending on your requirements
    };

};



    export async function getStaticProps({params}){
        const category = await fetchDataFromAPI(`/api/categories?filters[slug][$eq]=${params.slug}`)
        const products = await fetchDataFromAPI(`/api/product?populate=*&[filters][categories][slug][$eq]=${params.slug}`)

        return {
        props: {
        category,
        products
        },
    };

    };





