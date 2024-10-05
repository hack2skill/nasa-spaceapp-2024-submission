import React, { useState, useEffect } from 'react';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { ArrowUp, User, X } from 'lucide-react'; 

const Header = ({ onSelectPlanet, title, home, selectedPlanet }) => {
    const [showExplanation, setShowExplanation] = useState(false); 
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowExplanation(true); 
        }, 6000); 

        return () => clearTimeout(timer);
    }, []); 

    const handleClose = () => {
        setShowExplanation(false); 
    };
    return (
        <div className="header section-p">
            <p>{title}</p>
            {home && (
                <div className="header-flex-end">
                    {!localStorage.getItem('isAuth') && (
                        <div className="header--login-btn">
                            <User className='icon' />
                            <Link to={'/create-user'}>Create User</Link>
                        </div>
                    )}
                    <SearchBar onSelectPlanet={onSelectPlanet} />
                </div>
            )}
            {home && showExplanation && !selectedPlanet && ( 
                <div className="explanation-div">
                    <ArrowUp color='var(--text-white)' className='icon'/>
                    <div className="explanation-content">
                        <X className='icon' onClick={handleClose}/>
                        <p>Click Here</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
