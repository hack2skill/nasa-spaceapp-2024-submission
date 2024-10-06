'use client'
import React, { useState } from 'react';
import Image from 'next/image'; 
import Frame from "../../public/Frame 2.png"; // Ensure image file path is correct

import Link from 'next/link'; // Use next/link for navigation
import { NavIcon } from '../data/NavData';

const SideNav = () => {
  const [tap, setTap] = useState(true);

  return (
    <div className="text-text02 bg-richblack-800 flex flex-col max-w-[14rem] py-8 px-5">
      <Image 
        className="size-14 aspect-square cursor-pointer" 
        onClick={() => setTap(!tap)} 
        src={Frame} 
        alt="Toggle Button"
      />
      <div className="flex flex-col space-y-4 mt-8">
        {NavIcon.map((item, key) => (
          <Link key={key} href={item.to} passHref>
            <div 
              className={`flex items-center space-x-5 py-2 px-3 rounded-md ${
                tap ? 'bg-secondary text-text01' : 'hover:bg-richblack-800 hover:text-text01'
              }`}
            >
              <item.icon className="text-lg" />
              {tap && <span className="hidden md:flex">{item.name}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
