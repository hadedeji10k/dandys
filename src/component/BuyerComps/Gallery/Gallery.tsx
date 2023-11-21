import { useState } from 'react';

interface Image {
  id: string;
  imageUrl: string;
}

function Gallery({ imageList }: { imageList: Array<Image> }) {
  const [renderImage, setRenderImage] = useState<string>(
    (imageList[0] as Image)?.imageUrl || '',
  );

  const [active, setActive] = useState<{ [key: string]: boolean }>({
    [imageList[0]?.id]: true,
  });

  const handleRenderImage = (id: string, image: string) => {
    if (id) {
      setRenderImage(image);
      setActive((prev) => ({ [id]: !prev[id] }));
    }
  };

  return (
    <main className='flex flex-col lg:flex-row justify-between'>
      <section className='w-full lg:w-2/12 flex flex-row lg:flex-col gap-1 order-last lg:order-first mt-4 lg:mt-0'>
        {imageList.map(({ imageUrl, id }: { imageUrl: string; id: string }) => (
          <figure
            key={id}
            onClick={() => handleRenderImage(id, imageUrl)}
            className={
              active[id]
                ? 'activeThumb  w-3/12 lg:w-full'
                : 'notActiveThumb w-3/12 lg:w-full'
            }
          >
            <img src={imageUrl} alt='' />
          </figure>
        ))}
      </section>
      <aside className='w-full lg:w-9/12'>
        <figure className='notActiveThumb'>
          <img src={renderImage} alt='' />
        </figure>
      </aside>
    </main>
  );
}

export default Gallery;
