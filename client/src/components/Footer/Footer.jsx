import React from "react";
import "./Footer.css";
import DiscordIcon from '../../assets/images/icons/discord.svg'
import InstaIcon from '../../assets/images/icons/linkedin-in.svg'
import TwitterIcon from '../../assets/images/icons/twitter.svg'
export default function Footer() {

    return (
        <footer id="footer" className="section-p">
            <div className="copyright">
                <button className='footer--btn'>
                    Lorem.
                </button>
                <small>@2024 Exoplanetarium</small>
            </div>
            <div className="footer--links">
                <a href="">About</a>
                <a href="">Privacy & Terms</a>
                <a href="">FAQs</a>
                <img src={InstaIcon} className='icon' alt="" />
                <img src={TwitterIcon} className='icon' alt="" />
                <img src={DiscordIcon} className='icon' alt="" />
            </div>
        </footer>
    );
}