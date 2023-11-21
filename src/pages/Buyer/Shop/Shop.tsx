import { BiSearch } from 'react-icons/bi';
import './Shop.scss';
import { FaSquare } from 'react-icons/fa6';
import ProductCard from '@/component/BuyerComps/Product/ProductCard';
import { product } from '@/component/BuyerComps/Product/ProductData';
import { IProductCard } from '@/interface';
import SecondaryFooter from '@/component/BuyerComps/SecondaryFooter/SecondaryFooter';

function Shop() {
  return (
    <main className='shop'>
      <section className='container mx-auto py-8'>
        <header className='flex flex-wrap justify-between'>
          <div className='flex gap-2 w-full md:w-3/12 m'>
            <button className='flex gap-2 items-center sale'>
              {' '}
              <FaSquare /> SALE
            </button>

            <button className='flex gap-2 items-center new'>
              {' '}
              <FaSquare /> NEW
            </button>
          </div>

          <div className='search flex items-center w-full md:w-3/12 my-4 md:my-0'>
            <input type='search' name='search' placeholder='search' />
            <BiSearch className='searchIcon' />
          </div>

          <div className='w-full md:w-3/12'>
            <select className='w-full'>
              {[
                { title: 'Default' },
                { title: 'Popularity' },
                { title: 'Latest' },
                { title: 'Price: Low to High' },
                { title: 'Price: High to Low' },
              ].map((item, idx) => (
                <option key={idx} value={item.title}>
                  {' '}
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className='flex flex-wrap my-8'>
          {product.map((item: IProductCard) => (
            <section key={item.id} className='p-3 w-full md:w-3/12 '>
              <ProductCard product={item} />
            </section>
          ))}
        </section>

        <section>
          <SecondaryFooter />
        </section>
      </section>
    </main>
  );
}

export default Shop;
