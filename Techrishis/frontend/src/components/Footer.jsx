// Footer.js
import React from "react";
import gmailIcon from "../assets/gmail.png";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import youtubeIcon from "../assets/youtube.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2024 Workout Buddy. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://mail.google.com/mail/u/0/#inbox">
            <img src={gmailIcon} alt="Gmail" />
          </a>
          <a href="https://www.facebook.com">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.youtube.com">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
