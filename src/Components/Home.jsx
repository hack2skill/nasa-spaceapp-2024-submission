import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (

<div className='relative w-screen h-screen overflow-hidden'>
<video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
  <source src="Earth - Made with Clipchamp.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

{/* Optional Darker Overlay for better text readability */}
<div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0"></div>

{/* Overlay Content */}
<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-8 md:px-12">
  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-xl">
    Welcome to Our Space Exploration
  </h1>
  <p className="text-lg md:text-2xl lg:text-3xl mb-8 drop-shadow-xl">
    Embark on a journey beyond the stars and explore the wonders of the universe.
  </p>
  <Link to="/about" className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300">
          Get Started         </Link>
</div>
</div>
  );
};

export default Home;
