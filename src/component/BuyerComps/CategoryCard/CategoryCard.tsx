import React from 'react';
import './CategoryCard.scss';
import { Link } from 'react-router-dom';

function CategoryCard({ imageUrl }: { imageUrl: string }) {
  return (
    <Link to='#' className='categoryCard'>
      <figure className='catImage cardContainer'>
        <img src={imageUrl} alt='' />
        <div className='hoverBg'>
          <button type='button' className='main-btn'>
            Face
          </button>
        </div>
      </figure>
    </Link>
  );
}

export default CategoryCard;
