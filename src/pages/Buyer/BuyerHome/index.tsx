import { useState } from 'react';
import ProductSlider from '@/component/BuyerComps/Product/ProductSlider';
import './BuyerHome.scss';
import TabTitle from '@/component/BuyerComps/Tabs/TabTitle';
import Woman from '@/component/BuyerComps/Product/Woman';
import Man from '@/component/BuyerComps/Product/Man';
import Hair from '@/component/BuyerComps/Product/Hair';
import Korean from '@/component/BuyerComps/Product/Korean';
import Fitness from '@/component/BuyerComps/Product/Fitness';
import Fragrance from '@/component/BuyerComps/Product/Fragrance';
import TabContents from '@/component/BuyerComps/Tabs/TabContents';
import { images } from '@/exports/images';
import CategoryCard from '@/component/BuyerComps/CategoryCard/CategoryCard';
import BlogCard from '@/component/BuyerComps/BlogCard/BlogCard';
import { IBlogCard } from '@/interface';

function BuyerHome() {
  const [activeTab, setActiveTab] = useState<string>('1');

  const tabsTitle = [
    { id: '1', title: 'Woman' },
    { id: '2', title: 'Man' },
    { id: '3', title: 'Hair' },
    { id: '4', title: 'Koreans' },
    { id: '5', title: 'Fitness & Wellness' },
    { id: '6', title: 'Fragrance' },
  ];

  const tabsComps = [
    { id: '1', comp: <Woman /> },
    { id: '2', comp: <Man /> },
    { id: '3', comp: <Hair /> },
    { id: '4', comp: <Korean /> },
    { id: '5', comp: <Fitness /> },
    { id: '6', comp: <Fragrance /> },
  ];

  return (
    <main className='buyerHome '>
      <section className='flex flex-col  w-full'>
        <article className='heroSection flex md:justify-center justify-end align-center flex-col'>
          <div className='heroText flex flex-col justify-between'>
            <h2> High-End Beauty and Care</h2>
            <p>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can&apos;t refuse.
            </p>
            <div className='mt-5'>
              <button className='main-btn' type='button'>
                SHOP NOW
              </button>
            </div>
          </div>
        </article>

        <article className='d-flex flex-col my-8 popularProduct container mx-auto'>
          <section className='text-center popularProductTitle  my-5 w-full md:w-5/12 mx-auto'>
            <h3>Popular Products</h3>
            <p>
              {' '}
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can&apos;t refuse.
            </p>
          </section>

          <section className='flex flex-wrap   justify-between mx-auto md:w-9/12 w-11/12 '>
            {tabsTitle.map(({ id, title }) => (
              <section key={id} className='my-2'>
                <TabTitle
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  id={id}
                  title={title}
                  activeClass='active'
                  notActiveClass='notActive'
                />
              </section>
            ))}
          </section>

          <section className='tabComps'>
            {tabsComps.map(({ id, comp }) => (
              <TabContents activeTab={activeTab} id={id} comps={comp} />
            ))}
          </section>
        </article>

        <article className='flex flex-wrap  w-full md:w-8/12 mx-auto'>
          {[
            { imageUrl: images.brand1 },
            { imageUrl: images.brand2 },
            { imageUrl: images.brand3 },
            { imageUrl: images.brand4 },
          ].map((item, idx) => (
            <div key={idx} className='w-6/12 md:w-3/12'>
              <figure>
                <img src={item.imageUrl} alt='' />
              </figure>
            </div>
          ))}
        </article>

        {/*== 20% skin care start=== */}
        <article className='skinCareBanner flex md:justify-end justify-end align-center flex-row'>
          <div className='skinCareText flex flex-col gap-5 justify-center'>
            <h2>
              {' '}
              <span> 20% </span>
              off skin care products
            </h2>
            <p>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can&apos;t refuse.
            </p>
            <div className='mt-5'>
              <button className='main-btn' type='button'>
                SHOP NOW
              </button>
            </div>
          </div>
        </article>
        {/*== 20% skin care end=== */}

        {/*== Top Categories start=== */}

        <article className='d-flex flex-col my-8 popularProduct container mx-auto'>
          <section className='text-center popularProductTitle  my-5 w-full md:w-5/12 mx-auto'>
            <h3>Top Categories</h3>
            <p>
              {' '}
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can&apos;t refuse.
            </p>
          </section>

          <section className='flex flex-wrap'>
            {[
              { imageUrl: images.face7 },
              { imageUrl: images.undies },
              { imageUrl: images.legFlower },
            ].map((item, idx) => (
              <div key={idx} className='w-full md:w-4/12 p-2'>
                <CategoryCard imageUrl={item.imageUrl} />
              </div>
            ))}
          </section>
        </article>
        {/*== Top Categories end=== */}

        {/*== Best seller start=== */}

        <article className='d-flex flex-col my-8 popularProduct container mx-auto'>
          <section className='text-center popularProductTitle  my-5 w-full md:w-5/12 mx-auto'>
            <h3>Best Sellers</h3>
            <p>
              {' '}
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can&apos;t refuse.
            </p>
          </section>
          <ProductSlider />
        </article>
        {/*== Best seller end=== */}

        {/*== Blog start=== */}

        <article className='d-flex flex-col my-8 popularProduct container mx-auto'>
          <section className='text-center popularProductTitle  my-5 w-full md:w-5/12 mx-auto'>
            <h3>The Latest News at Dandys</h3>
            <p>
              {' '}
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can&apos;t refuse.
            </p>
          </section>

          <section className='flex flex-wrap'>
            {[
              {
                id: '1',
                title: 'Perfumes, perfumed or eau de toilette?',
                contents:
                  'Nourish your skin with toxin-free cosmetic products. With the offers that you can&apos;t refuse.',
                imageUrl: images.undies,
              },
              {
                id: '1',
                title: 'Perfumes, perfumed or eau de toilette?',
                contents:
                  'Nourish your skin with toxin-free cosmetic products. With the offers that you can&apos;t refuse.',
                imageUrl: images.legFlower,
              },
            ].map((item: IBlogCard) => (
              <div key={item.id} className='w-full md:w-6/12 p-2'>
                <BlogCard blog={item} />
              </div>
            ))}
          </section>
        </article>
        {/*== Blog end=== */}
      </section>
    </main>
  );
}

export default BuyerHome;
