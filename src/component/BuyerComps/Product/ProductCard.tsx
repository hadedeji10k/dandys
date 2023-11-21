import './ProductStyles.scss';
import { IProductCard } from '@/interface';
import { BsCart2, BsHeart, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface ProductCard {
  product: IProductCard;
}

function ProductCard({ product }: ProductCard) {
  const { id, title, imageUrl, oldPrice, newPrice, off, sale, newProd } =
    product;
  return (
    <Link to={`/${id}`} className='productCard '>
      {off && <p className='off'> {off} </p>}
      <div className='newProd'>
        {newProd && <p className='newP'> {newProd}</p>}
        {sale && <p className='newSale'> {sale}</p>}
      </div>
      <figure className='productImage cardContainer'>
        <img src={imageUrl} alt='Dandys product image' />
        <div className='hoverBg'>
          <div className='hoverIcon'>
            <BsSearch />
          </div>
          <div className='hoverIcon'>
            <BsCart2 />
          </div>
          <div className='hoverIcon'>
            <BsHeart />
          </div>
        </div>
      </figure>

      <section className='flex flex-col px-3 justify-center p-10'>
        <h3 className='text-center'> {title} </h3>
        <div className='flex justify-center gap-3 w-12/12 container mx-auto'>
          <p className='oldPrice'> ₦{oldPrice} </p>
          <p> ₦{newPrice} </p>
        </div>
      </section>
    </Link>
  );
}

export default ProductCard;
