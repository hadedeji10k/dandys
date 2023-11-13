import { images } from '@/exports/images';
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';

import Logo from '../../../assets/Logo 2.png';
import paymentMethod from '../../../assets/paymethod.webp';

function SecondaryFooter() {
  return (
    <main>
      <section className='flex flex-wrap '>
        {[
          { imageUrl: images.face1 },
          { imageUrl: images.face2 },
          { imageUrl: images.face3 },
          { imageUrl: images.face4 },
          { imageUrl: images.face5 },
          { imageUrl: images.face6 },
        ].map((item: any, idx: number) => (
          <figure
            key={idx}
            className=' cardContainer faceCards w-full md:w-2/12'
          >
            <img src={item.imageUrl} alt='' />

            <div className='hoverBg'>
              <BsInstagram size={30} />
            </div>
          </figure>
        ))}
      </section>

      <section className='container mx-auto my-4 secFooter flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-full md:w-3/12 text-center md:text-start'>
          <small>Find us here:</small>

          <div className='flex gap-1 followUs justify-center md:justify-start'>
            <a href='#' target='_blank' rel='noreferrer'>
              <BsInstagram />
            </a>
            <a href='#' target='_blank' rel='noreferrer'>
              <BsTwitter />
            </a>
            <a href='#' target='_blank' rel='noreferrer'>
              <BsLinkedin />
            </a>
            <a href='#' target='_blank' rel='noreferrer'>
              <BsFacebook />
            </a>
            <a href='#' target='_blank' rel='noreferrer'>
              <BsYoutube />
            </a>
          </div>
        </div>

        <div className='w-full md:w-3/12 md:my-0 my-5'>
          <figure className='w-6/12 mx-auto'>
            <img src={Logo} alt='Dandys logo' />
          </figure>
        </div>

        <div className='w-full md:w-3/12 text-center md:text-start'>
          <small>Payment Methods::</small>

          <figure className='w-9/12 md:w-full mx-auto'>
            <img src={paymentMethod} alt='Dandys logo' />
          </figure>
        </div>
      </section>
    </main>
  );
}

export default SecondaryFooter;
