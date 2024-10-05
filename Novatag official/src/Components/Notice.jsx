import React, { useEffect, useRef } from 'react';

const Notice = () => {
  const notices = [
    "Black Hole Duo: Hubble and Chandra discover two supermassive black holes near each other",
    "Solar Flares Study: NASA monitors solar storms and flares impacting Earth",
    "Europa Clipper Mission: NASA readies for the exploration of Jupiter's moon Europa",
    "2024 Hottest Summer: NASA confirms 2024 as the hottest recorded summer",
    "3D-Printed Engines: NASA pioneers spacecraft engines through 3D printing",
    "Hybrid Electric Aircraft: NASA tests hybrid electric planes for eco-friendly aviation",
    "Artemis II Lunar Training: Crew is practicing in Iceland’s terrain for their lunar mission",
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const startScrolling = () => {
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollStep = 1;
      const scrollInterval = setInterval(() => {
        scrollAmount += scrollStep;
        scrollContainer.scrollTop = scrollAmount;

        if (scrollContainer.scrollTop >= scrollHeight / 2) {
          scrollAmount = 0;
        }
      }, 30);

      return scrollInterval;
    };

    const scrollInterval = startScrolling();

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div className="w-96 h-[82vh] border-2 border-gray-300 shadow-lg rounded-xl overflow-hidden glass-effect">
      <h2 className="text-center text-xl font-bold py-3 text-white relative">
        InfoBoard
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-cyan-400"></span>
      </h2>

      <div ref={scrollRef} className="h-full overflow-hidden relative">
        <div className="space-y-3 p-2 absolute inset-0">
          {notices.concat(notices).map((notice, index) => (
            <div key={index} className="p-4 cursor-pointer text-white border bg-black/40 rounded-lg shadow-md hover:shadow-white/20 transition-transform duration-200 transform">
              {notice}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notice;
