import React from 'react';

function Additionalinfo({
  weight,
  dimensions,
  capColors,
}: {
  weight: string;
  dimensions: string;
  capColors: [];
}) {
  return (
    <main>
      <section className=' pb-3 productName'>
        <p>
          <span className='greyText'>Weight: </span>
          {weight}
        </p>
        <p>
          <span className='greyText'>Dimensions: </span>
          {dimensions}
        </p>
        <p>
          <span className='greyText'>Cover cap colors: </span>

          {capColors.map((item: string, idx: string) => (
            <span key={idx}> {item}, </span>
          ))}
        </p>
      </section>
    </main>
  );
}

export default Additionalinfo;
