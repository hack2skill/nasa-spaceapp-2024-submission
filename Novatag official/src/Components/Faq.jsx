import React, { useState, useEffect } from "react";

const Faq = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <>
      <div className="h-[84vh] flex flex-col sm:flex-row items-center justify-center max-w-screen-xl mx-auto px-4 sm:px-10 overflow-hidden gap-8 sm:gap-16">
        {/* Left Section - FAQ List */}
        <div
          className={`flex flex-col gap-8 sm:w-1/2 transform transition-transform duration-1000 ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-semibold text-lg sm:text-xl">  How are exoplanets discovered?</h1>
            <p className="text-sm sm:text-base">
               Most exoplanets are discovered using two primary methods:
              Transit method: When a planet passes in front of its star, it causes a small dip in the star’s brightness, which can be detected by telescopes.
              Radial velocity method: This method measures the slight wobble of a star caused by the gravitational pull of an orbiting planet.
            </p>
          </div>
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-semibold text-lg sm:text-xl"> What types of exoplanets exist?</h1>
            <p className="text-sm sm:text-base">
               Exoplanets come in a wide variety of types, including:
              Gas giants: Large planets like Jupiter and Saturn.
              Neptunian: Similar in size and composition to Neptune.
              Super-Earths: Planets with a mass larger than Earth but smaller than Neptune.
              Terrestrial (rocky) planets: Earth-like planets with solid surfaces.
            </p>
          </div>
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-semibold text-lg sm:text-xl"> Can exoplanets support life?</h1>
            <p className="text-sm sm:text-base">
               Some exoplanets are located in the "habitable zone" of their stars, where liquid water might exist. This zone is also known as the "Goldilocks zone," 
              but the presence of water doesn’t guarantee life. Scientists are searching for planets with Earth-like conditions for possible life.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`flex flex-col gap-8 sm:w-1/2 transform transition-transform duration-1000 ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-semibold text-lg sm:text-xl"> What is the habitable zone?</h1>
            <p className="text-sm sm:text-base">
               The habitable zone of a planet is the distance from a star where liquid water can exist on a planet's surface, making it a potential environment for life. It's also known as the 
              Goldilocks' zone because the conditions are just right, neither too hot nor too cold.
            </p>
          </div>
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-semibold text-lg sm:text-xl"> What is the James Webb Space Telescope's role in exoplanet research?</h1>
            <p className="text-sm sm:text-base">
               The James Webb Space Telescope (JWST), launched in 2021, is designed to study exoplanets in more detail, including analyzing their atmospheres for signs of life, and taking
               direct images of certain exoplanets.
            </p>
          </div>
          <div className="text-white flex flex-col gap-2">
            <h1 className="font-semibold text-lg sm:text-xl"> Can we directly observe exoplanets?</h1>
            <p className="text-sm sm:text-base">
               Directly imaging exoplanets is extremely challenging because they are faint and close to bright stars. However, advances in technology, such as the use of 
              coronagraphs, allow us to capture images of some exoplanets.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
