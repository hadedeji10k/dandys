import React from 'react';
import Slider from 'react-slick';
import { product } from './ProductData';
import ProductCard from './ProductCard';
import { IProductCard } from '@/interface';

function ProductSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main className='productSlider w-10/12'>
      <section className=''>
        <Slider {...settings}>
          {product.map((item: IProductCard) => (
            <section key={item.id} className='p-3'>
              <ProductCard product={item} />
            </section>
          ))}
        </Slider>
      </section>
    </main>
  );
}

export default ProductSlider;
