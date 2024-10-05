import React from 'react';
import './Faqs.css'
import arrowDownIcon from '../../assets/images/icons/arrowDown.svg'
function Faqs() {
    return (
        <main className="faqs section-p">
            <h2 className='title'>FAQS</h2>
            <p className='sub--title'>Frequently asked Question about <i>Exoplanet-X</i></p>
            <form className="faqs--form">
                <ol className="group">
                    <li>1. What is an exoplanet?</li>
                    <small>An exoplanet is a planet that orbits a star outside our solar system.</small>
                    <img src={arrowDownIcon} alt="Close question" className='icon'/>
                </ol>
                <ol className="group">
                    <li>2. How are exoplanets discovered?</li>
                    <small>Exoplanets are detected using methods like the transit method and radial velocity.</small>
                    <img src={arrowDownIcon} alt="Close question" className='icon'/>
                </ol>
                <ol className="group">
                    <li>3. Can exoplanets support life?</li>
                    <small>Some exoplanets, called "habitable zone" planets, may have conditions suitable for life.</small>
                    <img src={arrowDownIcon} alt="Close question" className='icon'/>
                </ol>
                <ol className="group">
                    <li>4. How does AI help in exoplanet exploration?</li>
                    <small>AI models predict habitability, discovery trends, and identify potential hotspots for future exploration.</small>
                    <img src={arrowDownIcon} alt="Close question" className='icon'/>
                </ol>
                <ol className="group">
                    <li>5. Can I interact with 3D exoplanet models?</li>
                    <small>   Yes! Our platform offers real-time 3D visualizations of exoplanets using advanced graphics technology.</small>
                    <img src={arrowDownIcon} alt="Close question" className='icon'/>
                </ol>
            </form>
      </main>
    );
}

export default Faqs;