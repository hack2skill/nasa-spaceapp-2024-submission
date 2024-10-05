import React from 'react';
import DiscoveryMethod from '../../components/DiscoveryMethod/DiscoveryMethod';
import Header from '../../components/Header/Header';

function DiscoveryAnalyzer({onSelectPlanet}) {
    return (
        <main className="page--outer">
            <div className="content--container">
            <Header onSelectPlanet={onSelectPlanet} title={"Discovery Analyzer Page"}/>
            <DiscoveryMethod/>
            </div>
        </main>
    );
}

export default DiscoveryAnalyzer;