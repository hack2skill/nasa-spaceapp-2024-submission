import React from 'react';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">NEXO</div>
      
      <div className="nav-wrapper">
        <nav className="nav-links">
            <Link 
          to="about"
          smooth={true}
          duration={800}
          offset={-70}>
            About</Link>
          <Link 
          to="the-app"
          smooth={true}
          duration={800}
          offset={-70}>The App</Link>
          <Link to="simulate"
          smooth={true}
          duration={800}
          offset={-70}>Simulate</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
