import React from 'react';
import { IBlogCard } from '@/interface';
import { Link } from 'react-router-dom';
import './BlogCard.scss';
interface BlogCard {
  blog: IBlogCard;
}

function BlogCard({ blog }: BlogCard) {
  const { title, imageUrl, contents } = blog;

  return (
    <main className='blogCard '>
      <figure className='blogImage'>
        <img src={imageUrl} alt='Dandys blog image' />
      </figure>

      <section className='flex flex-col px-3 justify-center p-10'>
        <h3> {title} </h3>
        <p className='my-5'> {contents} </p>
        <div className='readMore'>
          <Link to='#'> Read more</Link>
        </div>
      </section>
    </main>
  );
}

export default BlogCard;
