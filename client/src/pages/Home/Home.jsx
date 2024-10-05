import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import VertexPlanet from '../../components/VertexPlanet/VertextPlanet'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
export default function Home({onSelectPlanet, selectedPlanet}) {
  return (
    <>
      <main className="page--outer">
        <div className="content--container">
          <Header onSelectPlanet={onSelectPlanet} selectedPlanet={selectedPlanet} title={"Overview Page"} home={true}/>
          {selectedPlanet && <VertexPlanet selectedPlanet={selectedPlanet}/> }
          {selectedPlanet && <Link to={'https://esahubble.org/images/archive/category/exoplanets/'} className='content--note'>Based on Artistic impressions of NASA's Hubble Telescope Repository</Link>}
        </div>
        <Footer/>
      </main>
    </>
  )
}
