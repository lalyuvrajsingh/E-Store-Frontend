import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const ProductDetailsCarousel = ({images}) => {

   

    return (
        <div className='text-white text-[20px] w-full max-w-[1360px] max-auto sticky top-[50px]'>
            <Carousel 
            autoPlay={true}
            infiniteLoop={true}
            width={400}
            thumbWidth={60}
            showStatus={false}
            showThumbs={true}
            showIndicators={false}
            className='productCarousel'>

            {images.map((img)=>(

                <img src={img.attributes.url} className="border border-gray-200" key={img.id} alt={img.attributes.name} />

            ))}
            </Carousel>
        </div>
    );
}

export default ProductDetailsCarousel;
