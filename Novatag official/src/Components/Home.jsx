import React from 'react';
import Notice from './Notice';

const Home = () => {
  return (
    <>
    <div className="h-[84vh] flex justify-between">
        {/* <img className='h-52 w-52' src='astronaut.png'/> */}
      <div className="w-4/5 flex flex-col justify-center">
        <h1 className="text-white text-center tracking-widest text-5xl filter comfortaa">EXOPLANETS</h1>
        <p className="comfortaa text-white text-center text-2xl mt-16 px-16 tracking-wider leading-relaxed">
          An <span className="text-cyan-400">Exoplanet</span> is any planet beyond our solar system. Most of them orbit other stars, but some free-floating exoplanets, called rogue planets, are untethered to any star. We’ve confirmed more than 5,600 exoplanets out of the billions that we believe exist.
        </p>
      </div>

      {/* Right side: Notice Board */}
      <div className="w-3/5 flex justify-center items-center">
        <Notice />
      </div>
    </div>
    </>
  );
};

export default Home;
