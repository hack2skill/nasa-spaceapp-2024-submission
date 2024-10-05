

import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { SiSpacemacs } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const HandleMenu = () => {
    setIsMenuOpen(!IsMenuOpen);
  };

  return (
    <>
      <nav className="bg-transparent absolute z-50 w-full h-[40px]">
        {/* Mobile Navigation */}
        <div id="PhoneNav" className="sm:hidden relative h-full flex justify-between px-6 items-center">
          <span className="text-[25px] text-white">
            <SiSpacemacs />
          </span>
          {/* Menu Toggle Button */}
          {IsMenuOpen ? (
            <span onClick={HandleMenu} className="text-[25px] text-white cursor-pointer">
              <RxCross2 />
            </span>
          ) : (
            <span onClick={HandleMenu} className="text-[25px] text-white cursor-pointer">
              <FiAlignJustify />
            </span>
          )}
          {/* Animated Mobile Menu */}
          <div
            className={`h-[100vh] w-screen p-6 bg-black text-white absolute top-[45px] right-0 z-10 transition-all duration-300 ease-in-out ${
              IsMenuOpen ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-full'
            }`}
          >
            <div className="flex flex-col gap-8 justify-center items-center">
              <h2 onClick={HandleMenu}>
                <Link to="/" className="text-lg">Home</Link>
              </h2>
              <h2 onClick={HandleMenu}>
                <Link to="/demo" className="text-lg">Demo</Link>
              </h2>
              <h2 onClick={HandleMenu}>
                <Link to="/contact" className="text-lg">Contact Us</Link>
              </h2>
              <h2 onClick={HandleMenu}>
                <Link to="/gallery" className="text-lg">Gallery</Link>
              </h2>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex justify-center pt-5 gap-10 items-center text-white h-full sm:px-[20vmin] md:px-[30vmin] lg:px-[50vmin]">
          <h2><Link to="/" className="text-lg">Home</Link></h2>
          <h2><Link to="/demo" className="text-lg">Demo</Link></h2>
          <h2><Link to="/contact" className="text-lg">Contact Us</Link></h2>
          <h2><Link to="/gallery" className="text-lg">Gallery</Link></h2>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
