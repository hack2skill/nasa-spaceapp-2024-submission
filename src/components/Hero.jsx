import React from 'react'
import { Link } from 'react-scroll';
import './Hero.css';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="hero">
        <div className='hero-content'>
            <p className='subheading'>---- An Orrery Web App</p>
            <h1>Navigate The Cosmos: <br/>Unlock The Mysteries Of <br/>Near-Earth Space!</h1>
            <div className='scroll-down'>
            <Link 
          to="about"
          smooth={true}
          duration={800}
          offset={-70}>

                <FaArrowDown size={32} color='white'/>
            </Link>
                <p>Scroll down</p>
            </div>
        </div>
    </div>
  )
}

export default Hero