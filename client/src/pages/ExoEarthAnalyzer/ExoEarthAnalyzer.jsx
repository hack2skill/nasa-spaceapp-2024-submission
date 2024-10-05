import React from 'react';
import ExoEarthComparator from '../../components/ExoEarthComparator/ExoEarthComparator';
import Header from '../../components/Header/Header';

function ExoEarthAnalyzer({onSelectPlanet}) {
    return (
        <main className="page--outer">
            <div className="content--container">
            <Header onSelectPlanet={onSelectPlanet} title={"Comparator Page"}/>
            <ExoEarthComparator/>
            </div>
        </main>
    );
}

export default ExoEarthAnalyzer;