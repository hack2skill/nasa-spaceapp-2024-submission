import React from 'react'
import Header from '../../components/Header/Header'
import Faqs from '../../components/Faqs/Faqs'
export default function FaqsPage({onSelectPlanet}) {
  return (
    <main className="page--outer">
        <div className="content--container">
          <Header onSelectPlanet={onSelectPlanet} title={"Faqs Page"}/>
          <Faqs/>
        </div>
    </main>
  )
}
