import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./home.css";

const Home = () => {
  const contactButtonRef = useRef(null); // Use ref for the contact button
  const contactRef = useRef(null);

  useEffect(() => {
    // Smooth scroll to contact section
    const scrollToContact = () => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const contactButton = contactButtonRef.current;
    if (contactButton) {
      contactButton.addEventListener("click", scrollToContact);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (contactButton) {
        contactButton.removeEventListener("click", scrollToContact);
      }
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <header>
        <h1>SoilSense</h1>
        <nav>
          <a href="/" className="active">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </nav>
      </header>

      {/* Main Section */}
      <section>
        <div className="text-container">
          <span className="block mb-4 text-lg md:text-xl lg:text-2xl text-green-500 font-medium">
            Soil Sense
          </span>
          <p>
            SoilSense is a smart farm management tool that monitors soil health, vegetation, and rainfall data to help farmers optimize irrigation and boost crop productivity.
          </p>
          <div className="button-container">
            <Link to="/explore">
              <button>Explore</button>
            </Link>
            <Link to="/contactus">
              <button>Contact</button>
            </Link>
          </div>
        </div>

        <div className="image-container">
          <ShuffleGrid />
        </div>
      </section>

    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "https://plus.unsplash.com/premium_photo-1682092016074-b136e1acb26e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, src: "https://images.unsplash.com/photo-1609252509027-3928a66302fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, src: "https://images.unsplash.com/photo-1623211269755-569fec0536d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, src: "https://plus.unsplash.com/premium_photo-1682092034268-645322c1d308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, src: "https://images.unsplash.com/photo-1609252285522-ed0ebdd43551?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 6, src: "https://images.unsplash.com/photo-1707721691170-bf913a7a6231?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, src: "https://images.unsplash.com/photo-1639334189162-4b25b8aa4ca7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 8, src: "https://plus.unsplash.com/premium_photo-1682092607850-4ee61bcf73c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 9, src: "https://images.unsplash.com/photo-1623211267269-5e53a12cf20d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 10, src: "https://images.unsplash.com/photo-1623211270083-5743da6c67ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 11, src: "https://plus.unsplash.com/premium_photo-1678344176441-988d2e31455b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 12, src: "https://images.unsplash.com/photo-1612104785310-c37ef2d48617?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 13, src: "https://plus.unsplash.com/premium_photo-1682092792260-1b7cd1674a74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 14, src: "https://images.unsplash.com/photo-1527580477540-6ef8bc65b8a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 15, src: "https://images.unsplash.com/photo-1707811180403-c22b7ef06476?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 16, src: "https://images.unsplash.com/photo-1707721690544-781fe6ede937?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Home;

