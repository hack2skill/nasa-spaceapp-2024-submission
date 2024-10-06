import React from 'react';
import { Link } from 'react-scroll'; // Import from react-scroll
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">NEXO</h2>
        </div>
        <div className="footer-center">
          <nav className="footer-nav">
            <Link
              to="about"
              smooth={true}
              duration={800}
              offset={-70}
            >
              About
            </Link>
            <Link
              to="the-app"
              smooth={true}
              duration={800}
              offset={-70}
            >
              The App
            </Link>
            <Link
              to="simulate"
              smooth={true}
              duration={800}
              offset={-70}
            >
              Simulate
            </Link>
            <Link to="contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-right">
          {/* Social Icons */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 NEXO. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
