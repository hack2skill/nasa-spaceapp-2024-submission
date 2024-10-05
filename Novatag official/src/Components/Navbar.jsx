import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-black/55 text-white py-4 z-50 relative">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="">
            <img className="cursor-pointer h-14" src="logo.png" alt="Logo" />
          </Link>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden z-50">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop & Mobile Menu */}
          <ul
            className={`md:flex md:gap-12 md:text-md md:static absolute left-0 w-full md:w-auto bg-black/50 md:bg-transparent transition-all duration-300 ease-in-out max-md:items-center max-md:flex max-md:flex-col z-40 ${isOpen
              ? "top-16 opacity-100"
              : "top-[-500px] opacity-0 md:opacity-100"
              }`}
          >
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/explore"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/planets"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Planets
              </Link>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <a
                href="https://kids-novatag.vercel.app/"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Kids Section
              </a>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/quiz"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Quiz
              </Link>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/faq"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/dashboard"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li className="py-2 md:py-0 md:cursor-pointer md:hover:scale-110 md:duration-150">
              <Link
                to="/about"
                className="block px-4 py-2 md:px-0 hover:text-cyan-300 text-lg"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
            </li>
          </ul>
          <a
            // target="_blank"
            href="https://vansh1505.github.io/NOVAAI/"
            className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-32 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
          >
            <div className="ml-2 flex items-center gap-1 text-sm md:flex"></div>
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
            <div className="flex items-center">
              <span className="ml-1 text-white">Talk to NovaAI</span>
            </div>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
