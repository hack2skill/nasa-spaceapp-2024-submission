import React from 'react';

const Explore = () => {
  return (
    <>
      <div className='flex flex-col gap-8 justify-center items-center mt-2 px-4'>
      <div className='text-white text-3xl'>Explore exoplanets</div>
        <iframe className='h-[300px] sm:h-[450px] w-full sm:w-3/4 lg:w-1/2 rounded-2xl border-4 border shadow-lg filter brightness-110 z-30' src='https://eyes.nasa.gov/apps/exo/#/' title='NASA Eyes on Exoplanets' allowFullScreen/>
      </div>
    </>
  );
};

export default Explore;
