import React, { useState } from 'react';
import './ProductDetails.scss';
import { useParams } from 'react-router-dom';
import { FaSquare } from 'react-icons/fa6';
import Gallery from '@/component/BuyerComps/Gallery/Gallery';
import ProductSlider from '@/component/BuyerComps/Product/ProductSlider';
import SecondaryFooter from '@/component/BuyerComps/SecondaryFooter/SecondaryFooter';
import Description from '@/component/BuyerComps/ProductDetailsComps/Description';
import Additionalinfo from '@/component/BuyerComps/ProductDetailsComps/Additionalinfo';
import Review from '@/component/BuyerComps/ProductDetailsComps/Review';
import TabTitle from '@/component/BuyerComps/Tabs/TabTitle';
import { IProductCard } from '@/interface';
import TabContents from '@/component/BuyerComps/Tabs/TabContents';
import { product } from '@/component/BuyerComps/Product/ProductData';

function ProductDetails() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<string>('1');
  const [quantity, setQuantity] = useState<number>(0);

  const productToView: IProductCard | undefined = product.find(
    (item: IProductCard) => item.id === id,
  );

  const {
    title,
    imageList,
    oldPrice,
    newPrice,
    description,
    weight,
    dimensions,
    capColors,
  } = productToView;

  const handleCount = (id: string) => {
    if (id === 'add') {
      setQuantity((prev) => prev + 1);
    } else if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const tabsTitle = [
    { id: '1', title: 'DESCRIPTION' },
    { id: '2', title: 'ADDITIONAL INFORMATION' },
    { id: '3', title: 'REVIEWS (10)' },
  ];

  const tabsComps = [
    { id: '1', comp: <Description produtDesc={description} /> },
    {
      id: '2',
      comp: (
        <Additionalinfo
          weight={weight}
          dimensions={dimensions}
          capColors={capColors}
        />
      ),
    },
    { id: '3', comp: <Review /> },
  ];

  return (
    <main className='productDetailWrapper'>
      <section className='container mx-auto '>
        <section className='productDetails flex flex-col md:flex-row justify-between'>
          <article className='w-full md:w-5/12'>
            <Gallery imageList={imageList} />
          </article>

          <article className='productContent divide-y w-full md:w-6/12 mt-5 lg:mt-0'>
            <section className=' pb-3 productName'>
              <h2 className='mb-5'>{title}</h2>
              <p>
                <span className='greyText'>SKU: </span>12345{' '}
              </p>
              <p>
                <span className='greyText'>Category: </span>Women, Hair{' '}
              </p>
              <p>
                <span className='greyText'>Brand: </span>Bio-Formular
              </p>
            </section>
            <section className=' py-5 price flex gap-4'>
              <h2 className='greyText line-through '>{oldPrice}</h2>
              <h2>{newPrice}</h2>
            </section>
            <section className=' py-5 description'>
              <p>{description}</p>
            </section>

            <section className='py-5 capColor '>
              <div className='flex justify-between my-5 lg:my-0 w-full lg:w-6/12'>
                <p>Cover cap color:</p>

                <div className='flex gap-1 border p-1'>
                  {' '}
                  <FaSquare color='var(--green)' /> <FaSquare color='#000' />
                  <FaSquare color='#f00' />
                  <FaSquare color='#FFB207' /> <FaSquare color='#1A51A2' />{' '}
                </div>
              </div>

              <div className='flex justify-between items-center w-full lg:w-5/12  '>
                <p>Quantity:</p>

                <div className='flex gap-1 quantity'>
                  <p className='flex gap-2 items-center'>
                    <span id='subtract' onClick={() => handleCount('subtract')}>
                      {' '}
                      -{' '}
                    </span>
                    <span> {quantity} </span>
                    <span id='add' onClick={() => handleCount('add')}>
                      {' '}
                      +
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className='py-5 flex flex-col lg:flex-row gap-2 '>
              <div className='w-full lg:w-5/12'>
                <button className='main-btn w-full' type='button'>
                  {' '}
                  ADD TO CART
                </button>
              </div>
              <div className='w-full lg:w-5/12'>
                <button
                  className='outline-btn w-full mt-3 lg:mt-0'
                  type='button'
                >
                  {' '}
                  ADD TO WISHLIST
                </button>
              </div>
            </section>
          </article>
        </section>

        <article className='flex flex-col my-8 pb-5  border-b productDesc'>
          <section className='flex flex-row w-full titleWrapper gap-3'>
            {tabsTitle.map(({ id, title }) => (
              <section key={id} className=''>
                <TabTitle
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  id={id}
                  title={title}
                  activeClass='isActive'
                  notActiveClass='isNotActive'
                />
              </section>
            ))}
          </section>

          <section className='tabComps pt-4'>
            {tabsComps.map(({ id, comp }) => (
              <TabContents activeTab={activeTab} id={id} comps={comp} />
            ))}
          </section>
        </article>

        <section>
          <h2 className='text-center my-5'>Similar Items you may like</h2>
          <ProductSlider />
        </section>
        <section>
          <SecondaryFooter />
        </section>
      </section>
    </main>
  );
}

export default ProductDetails;
