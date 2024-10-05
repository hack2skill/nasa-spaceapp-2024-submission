import React, { useState } from 'react';
import './Navbar.css';
import { Home, Earth, Menu, FileQuestion, DiamondPlus, Telescope, User } from "lucide-react";

import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar({key}) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className={`navbar--container ${isNavbarOpen ? 'open' : 'closed'}`}>
            <div className='navbar--menu section-p'>
                <h2 className="menu--title">Menu</h2>
                <Menu className='icon'  color='var(--text-grey)' onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
            </div>
            {localStorage.getItem('isAuth') && 
                <div className='profile'>
                    <button>
                        <User />
                    </button>
                    <h2 className="profile--name">{JSON.parse(localStorage.getItem("UserData")).fname}</h2>
                    <p className="profile--designation">{JSON.parse(localStorage.getItem("UserData")).designation}</p>
                </div>
            }
            
            <ul className='navbar'>
                <div className="navbar--group section-p">
                    <li onClick={() => navigate('/')}>
                        <div className="icon-container">
                            <Home className="icon"  color='var(--text-grey)'/>
                            <span className="icon-name">Overview</span>
                        </div>
                        <Link to={'/'} key={location.pathname}>Overview</Link>
                    </li>
                </div>

                <p className="navbar--subtitles">Tools</p>

                <div className="navbar--group section-p">
                    <li onClick={() => navigate('/discovery-method-analyzer')} >
                        <div className="icon-container">
                            <Telescope className="icon" color='var(--text-grey)'/>
                            <span className="icon-name">Discovery Analyzer</span>
                        </div>
                        <Link to={'/discovery-method-analyzer'} >Discovery Analyzer</Link>
                    </li>
                    <li onClick={() => navigate('/habitability-predictor')} >
                        <div className="icon-container">
                            <DiamondPlus className="icon"color='var(--text-grey)'/>
                            <span className="icon-name">Habitability Estimator</span>
                        </div>
                        <Link to={'/habitability-predictor'}>Habitability Estimator</Link>
                    </li>
                    <li onClick={() => navigate('/exo-earth-comparator')} >
                        <div className="icon-container">
                            <Earth className="icon" color='var(--text-grey)'/>
                            <span className="icon-name">Exo Comparator</span>
                        </div>
                        <Link to={'/exo-earth-comparator'}>Exo Comparator</Link>
                    </li>
                </div>

                <p className="navbar--subtitles">Overview</p>

                <div className="navbar--group section-p">
                    <li onClick={() => navigate('/faqs')} >
                        <div className="icon-container">
                            <FileQuestion className="icon" color='var(--text-grey)'/>
                            <span className="icon-name">FAQS</span>
                        </div>
                        <Link to={'/faqs'}>FAQS</Link>
                    </li>
                </div>
            </ul>
        </div>
    );
}
